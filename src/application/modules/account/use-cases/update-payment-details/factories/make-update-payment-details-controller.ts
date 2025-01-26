import { UpdatePaymentDetailsController } from '../update-payment-details-controller';
import { makeUpdatePaymentdetailsUseCase } from './make-update-payment-details-use-case';

export function makeUpdatePaymentDetailsController() {
  const useCase = makeUpdatePaymentdetailsUseCase();

  return new UpdatePaymentDetailsController(useCase);
}
