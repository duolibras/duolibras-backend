import { makeCheckoutProvider } from '@/application/shared/providers/checkout-provider/make-checkout-provider';
import { makeAccountRepository } from '../../../repositories/make-account-repository';
import { CreatePaymentDetailsUseCase } from '../create-payment-details-use-case';

export function makeCreatePaymentdetailsUseCase() {
  const accountRepo = makeAccountRepository();
  const checkoutProvider = makeCheckoutProvider();

  return new CreatePaymentDetailsUseCase(accountRepo, checkoutProvider);
}
