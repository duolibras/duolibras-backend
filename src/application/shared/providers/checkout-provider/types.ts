import { AccountPaymentDetails } from '@/application/modules/account/entities/account-payment-details';

export interface ISetupPaymentDetailsRequest {
  accountId: string;
  returnUrl: string;
}

export interface ISetupAccountPaymentDataResponse {
  paymentDetails: AccountPaymentDetails;
}

export interface ICreateCourseResponse {
  stripeCourseId: string;
}

export interface ICalculateRevenueSplit {
  platformFee: number;
  teacherEarnings: number;
}

export interface ICheckoutCourseUrlResponse {
  url: string;
}

export type PaymentStatus = 'paid' | 'unpaid' | 'no_payment_required';

export interface CheckoutUrlOptions {
  successUrl?: string;
  cancelUrl?: string;
}
