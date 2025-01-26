import { AccountPaymentDetailsStatus } from '@/application/modules/account/entities/account-payment-details';
import { AccountRepository } from '@/application/modules/account/repositories/account-repository';
import Stripe from 'stripe';

export function accountUpdate(account: Stripe.Account, accountsRepo: AccountRepository) {
  return async () => {
    if (
      account.charges_enabled &&
      account.payouts_enabled &&
      !account.requirements?.currently_due?.length &&
      !account.requirements?.pending_verification
    ) {
      await accountsRepo.changeAccountPaymentDetailsStatus(account.id, AccountPaymentDetailsStatus.COMPLETED);
    }
  };
}
