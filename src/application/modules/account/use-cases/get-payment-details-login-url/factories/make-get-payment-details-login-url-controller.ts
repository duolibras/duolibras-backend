import { GetPaymentDetailsLoginUrlController } from '../get-payment-details-login-url-controller';
import { makeGetPaymentDetailsLoginUrlUseCase } from './make-get-payment-details-login-url-use-case';

export function makeGetPaymentDetailsLoginUrlController() {
  const useCase = makeGetPaymentDetailsLoginUrlUseCase();

  return new GetPaymentDetailsLoginUrlController(useCase);
}
