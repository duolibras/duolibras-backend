import { Course } from '@/application/modules/course/entities/course';
import Stripe from 'stripe';
import { CheckoutUrlOptions, ICheckoutCourseUrlResponse, ICreateCourseResponse, ISetupAccountPaymentDataResponse } from './types';

export interface CheckoutProvider {
  createSubscription(studentId: string, planId: string): Promise<object>;
  cancelSubscription(subscriptionId: string): Promise<object>;

  generateWebhookEvent(body: Record<string, any>, signatureKey: string): Stripe.Event;
  handleWebhookEvent(event: Stripe.Event): Promise<void>;

  setupAccountPaymentDetails(accountId: string, returnUrl: string): Promise<ISetupAccountPaymentDataResponse>;

  generateLoginUrl(stripeAccountId: string): Promise<string>;

  generateOnboardingUrl(stripeAccountId: string, returnUrl: string, token?: string): Promise<string>;

  createCourse(stripeAccountId: string, course: Course): Promise<ICreateCourseResponse>;

  generateCheckoutCourseUrl(stripeAccountId: string, course: Course, options: CheckoutUrlOptions): Promise<ICheckoutCourseUrlResponse>;
}
