import { makeAccountRepository } from '@/application/modules/account/repositories/make-account-repository';
import { makeCheckoutProvider } from '@/application/shared/providers/checkout-provider/make-checkout-provider';
import { makeCourseRepository } from '../../../repositories/make-course-repository';
import { UpdateCourseUseCase } from '../update-course-use-case';

export function makeUpdateCourseUseCase() {
  const courseRepo = makeCourseRepository();
  const accountRepo = makeAccountRepository();
  const checkoutProvider = makeCheckoutProvider();

  return new UpdateCourseUseCase(courseRepo, accountRepo, checkoutProvider);
}
