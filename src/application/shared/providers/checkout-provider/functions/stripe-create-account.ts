import { AccountPaymentDetails } from '@/application/modules/account/entities/account-payment-details';
import Stripe from 'stripe';
import { ISetupAccountPaymentDataResponse } from '../types';

export async function stripeCreateAccount(
  stripe: Stripe,
  accountId: string,
): Promise<ISetupAccountPaymentDataResponse> {

  const connectedAccount = await stripe.accounts.create({
    type: 'express',
    business_type: 'individual',
  });

  const paymentDetails = new AccountPaymentDetails({
    accountId,
    stripeAccountId: connectedAccount.id,
  });

  return {
    paymentDetails
  };
}
