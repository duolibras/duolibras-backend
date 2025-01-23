import { makeStorageProvider } from '@/application/shared/providers/storage-provider/make-storage-provider';
import { makeContentRepository } from '../../../repositories/make-content-repository';
import { UpdateContentUseCase } from '../update-content-use-case';

export function makeUpdateContentUseCase() {
  const contentRepo = makeContentRepository();
  const storageProvider = makeStorageProvider();

  return new UpdateContentUseCase(contentRepo, storageProvider);
}
