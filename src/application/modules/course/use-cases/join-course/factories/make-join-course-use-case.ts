import { makeAccountRepository } from '@/application/modules/account/repositories/make-account-repository';
import { makeCheckoutProvider } from '@/application/shared/providers/checkout-provider/make-checkout-provider';
import { makeCourseRepository } from '../../../repositories/make-course-repository';
import { JoinCourseUseCase } from '../join-course-use-case';

export function makeJoinCourseUseCase() {
  const accountRepo = makeAccountRepository();
  const courseRepo = makeCourseRepository();
  const checkoutProvider = makeCheckoutProvider();

  return new JoinCourseUseCase(accountRepo, courseRepo, checkoutProvider);
}
