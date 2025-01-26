import { makeAccountRepository } from '@/application/modules/account/repositories/make-account-repository';
import { makeCheckoutProvider } from '@/application/shared/providers/checkout-provider/make-checkout-provider';
import { makeCourseRepository } from '../../../repositories/make-course-repository';
import { DeleteCourseUseCase } from '../delete-course-use-case';

export function makeDeleteCourseUseCase() {
  const courseRepo = makeCourseRepository();
  const accountRepo = makeAccountRepository();
  const checkoutProvider = makeCheckoutProvider();

  return new DeleteCourseUseCase(courseRepo, accountRepo, checkoutProvider);
}
