import { LessonRepository } from '@/application/modules/lesson/repositories/lesson-repository';
import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { StorageProvider } from '@/application/shared/providers/storage-provider/storage-provider';
import { ContentRepository } from '../../repositories/content-repository';

interface IInput {
  contentId: string;
}

type IOutput = void;

export class DeleteContentUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly contentRepo: ContentRepository,
    private readonly lessonRepo: LessonRepository,
    private readonly storageProvider: StorageProvider,
  ) {}

  async execute({ contentId }: IInput): Promise<void> {
    const content = await this.contentRepo.getContent(contentId);

    if (!content) {
      throw new NotFoundHTTPError('Conteúdo não encontrada');
    }

    try {
      await this.storageProvider.remove(content.videoKey);

      await this.contentRepo.deleteContent(contentId);

      await this.lessonRepo.changeModulesCount(content.lessonId, 'DECREMENT');

    } catch {
      throw new InternalServerHTTPError('Ocorreu um erro ao excluir conteúdo');
    }
  }
}
