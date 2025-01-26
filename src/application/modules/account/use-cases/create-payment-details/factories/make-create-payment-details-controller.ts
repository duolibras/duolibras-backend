import { CreatePaymentDetailsController } from '../create-payment-details-controller';
import { makeCreatePaymentdetailsUseCase } from './make-create-payment-details-use-case';

export function makeCreatePaymentDetailsController() {
  const useCase = makeCreatePaymentdetailsUseCase();

  return new CreatePaymentDetailsController(useCase);
}
