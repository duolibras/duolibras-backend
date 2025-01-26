import { makeAccountRepository } from '@/application/modules/account/repositories/make-account-repository';
import { makeCheckoutProvider } from '@/application/shared/providers/checkout-provider/make-checkout-provider';
import { makeCourseRepository } from '../../../repositories/make-course-repository';
import { CreateCourseUseCase } from '../create-course-use-case';

export function makeCreateCourseUseCase() {
  const accountRepo = makeAccountRepository();
  const courseRepo = makeCourseRepository();
  const checkoutProvider = makeCheckoutProvider();

  return new CreateCourseUseCase(accountRepo, courseRepo, checkoutProvider);
}
