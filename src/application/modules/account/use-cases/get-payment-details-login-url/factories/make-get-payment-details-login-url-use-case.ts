import { makeCheckoutProvider } from '@/application/shared/providers/checkout-provider/make-checkout-provider';
import { makeAccountRepository } from '../../../repositories/make-account-repository';
import { GetPaymentDetailsLoginUrlUseCase } from '../get-payment-details-login-url-use-case';

export function makeGetPaymentDetailsLoginUrlUseCase() {
  const accountRepo = makeAccountRepository();
  const checkoutRepo = makeCheckoutProvider();

  return new GetPaymentDetailsLoginUrlUseCase(accountRepo, checkoutRepo);
}
