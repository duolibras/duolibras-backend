import { makeCheckoutProvider } from '@/application/shared/providers/checkout-provider/make-checkout-provider';
import { makeAccountRepository } from '../../../repositories/make-account-repository';
import { UpdatePaymentDetailsUseCase } from '../update-payment-details-use-case';

export function makeUpdatePaymentdetailsUseCase() {
  const accountRepo = makeAccountRepository();
  const checkoutProvider = makeCheckoutProvider();

  return new UpdatePaymentDetailsUseCase(accountRepo, checkoutProvider);
}
