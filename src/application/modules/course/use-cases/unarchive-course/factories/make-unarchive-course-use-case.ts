import { makeAccountRepository } from '@/application/modules/account/repositories/make-account-repository';
import { makeCheckoutProvider } from '@/application/shared/providers/checkout-provider/make-checkout-provider';
import { makeCourseRepository } from '../../../repositories/make-course-repository';
import { UnarchiveCourseUseCase } from '../unarchive-course-use-case';

export function makeUnarchiveCourseUseCase() {
  const courseRepo = makeCourseRepository();
  const accountRepo = makeAccountRepository();
  const checkoutProvider = makeCheckoutProvider();

  return new UnarchiveCourseUseCase(courseRepo, accountRepo, checkoutProvider);
}
