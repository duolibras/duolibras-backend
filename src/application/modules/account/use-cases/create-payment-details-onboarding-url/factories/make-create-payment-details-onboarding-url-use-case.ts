import { makeCheckoutProvider } from '@/application/shared/providers/checkout-provider/make-checkout-provider';
import { makeTokenProvider } from '@/application/shared/providers/token-provider/make-token-provider';
import { CreatePaymentDetailsOnboardingUrlUseCase } from '../create-payment-details-onboarding-url-use-case';

export function makeCreatePaymentDetailsOnboardingUrlUseCase() {
  const tokenProvider = makeTokenProvider();
  const checkoutProvider = makeCheckoutProvider();

  return new CreatePaymentDetailsOnboardingUrlUseCase(tokenProvider, checkoutProvider);
}
