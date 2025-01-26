import { Course } from '@/application/modules/course/entities/course';

import { env } from '@/application/config/env';
import Stripe from 'stripe';
import { CheckoutProvider } from './checkout-provider';
import { stripeCreateAccount } from './functions/stripe-create-account';
import { stripeCreateCourse } from './functions/stripe-create-course';
import { stripeGenerateCheckoutCourseUrl } from './functions/stripe-generate-checkout-course-url';
import { stripeGenerateOnboardingUrl } from './functions/stripe-generate-onboarding-url';
import { CheckoutUrlOptions, ICalculateRevenueSplit, ICheckoutCourseUrlResponse, ICreateCourseResponse, ISetupAccountPaymentDataResponse } from './types';
import { handleWebhook } from './webhook-functions/handle-webhook';

export class StripeCheckoutProvider implements CheckoutProvider {
  constructor(
    private readonly stripe: Stripe,
  ) {}

  generateWebhookEvent(body: any, signatureKey: string): Stripe.Event {
    return this.stripe.webhooks.constructEvent(body, signatureKey, env.stripe.webhookSignatureKey);
  }

  async handleWebhookEvent(event: Stripe.Event): Promise<void> {
    await handleWebhook(event);
  }

  async generateOnboardingUrl(stripeAccountId: string, returnUrl: string): Promise<string> {
    return stripeGenerateOnboardingUrl(this.stripe, stripeAccountId, returnUrl);
  }

  async setupAccountPaymentDetails(accountId: string, returnUrl: string): Promise<ISetupAccountPaymentDataResponse> {
    const { paymentDetails } = await stripeCreateAccount(this.stripe, accountId);
    paymentDetails.onboardingUrl = await this.generateOnboardingUrl(paymentDetails.stripeAccountId, returnUrl);
    return { paymentDetails };
  }

  async createCourse(stripeAccountId: string, course: Course): Promise<ICreateCourseResponse> {
    return stripeCreateCourse(this.stripe, stripeAccountId, course);
  }

  async generateCheckoutCourseUrl(stripeAccountId: string, course: Course, options: CheckoutUrlOptions):
  Promise<ICheckoutCourseUrlResponse> {
    const revenueSplit = StripeCheckoutProvider.calculateRevenueSplit(course.priceInCents!);

    return stripeGenerateCheckoutCourseUrl(
      this.stripe,
      stripeAccountId,
      course.stripeCourseId!,
      options,
      revenueSplit
    );
  }

  static calculateRevenueSplit(totalAmount: number): ICalculateRevenueSplit {
    const platformFee = Math.round(totalAmount * 0.15 * 100) / 100;
    const teacherEarnings = totalAmount - platformFee;

    return { platformFee, teacherEarnings };
  }

  createSubscription(studentId: string, planId: string): Promise<object> {
    throw new Error('Method not implemented.');
  }

  cancelSubscription(subscriptionId: string): Promise<object> {
    throw new Error('Method not implemented.');
  }
}
