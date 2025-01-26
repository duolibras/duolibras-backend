import { makeAccountRepository } from '@/application/modules/account/repositories/make-account-repository';
import { makeCheckoutProvider } from '@/application/shared/providers/checkout-provider/make-checkout-provider';
import { makeCourseRepository } from '../../../repositories/make-course-repository';
import { ArchiveCourseUseCase } from '../archive-course-use-case';

export function makeArchiveCourseUseCase() {
  const courseRepo = makeCourseRepository();
  const accountRepo = makeAccountRepository();
  const checkoutProvider = makeCheckoutProvider();

  return new ArchiveCourseUseCase(courseRepo, accountRepo, checkoutProvider);
}
