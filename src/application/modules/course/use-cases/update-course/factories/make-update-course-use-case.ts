import { makeAccountRepository } from '@/application/modules/account/repositories/make-account-repository';
import { makeFileRepository } from '@/application/modules/file/repositories/make-file-repository';
import { makeCheckoutProvider } from '@/application/shared/providers/checkout-provider/make-checkout-provider';
import { makeStorageProvider } from '@/application/shared/providers/storage-provider/make-storage-provider';
import { makeCourseRepository } from '../../../repositories/make-course-repository';
import { UpdateCourseUseCase } from '../update-course-use-case';

export function makeUpdateCourseUseCase() {
  const courseRepo = makeCourseRepository();
  const accountRepo = makeAccountRepository();
  const fileRepo = makeFileRepository();
  const checkoutProvider = makeCheckoutProvider();
  const storageProvider = makeStorageProvider();

  return new UpdateCourseUseCase(courseRepo, accountRepo, fileRepo, checkoutProvider, storageProvider);
}
