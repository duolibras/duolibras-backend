import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { StorageProvider } from '@/application/shared/providers/storage-provider/storage-provider';
import { Content } from '../../entities/content';
import { ContentRepository } from '../../repositories/content-repository';

interface IInput {
  contentId: string;
  name?: string;
  description?: string;
  video?: string;
}

interface IOutput {
  content: Content;
}

export class UpdateContentUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly contentRepo: ContentRepository,
    private readonly storageProvider: StorageProvider,
  ) {}

  async execute({ contentId, name, description, video }: IInput): Promise<IOutput> {
    const contentFound = await this.contentRepo.getContent(contentId);

    if (!contentFound) {
      throw new NotFoundHTTPError('Conteúdo não encontrado');
    }

    if (video) {
      await this.storageProvider.remove(contentFound.videoKey);

      const videoFile = await this.storageProvider.save(video);
      video = videoFile.fileKey;
    }

    const updatedContent = new Content({
      id: contentFound.id,
      name: name ?? contentFound.name,
      description: description ?? contentFound.description,
      videoKey: video ?? contentFound.videoKey,
      lessonId: contentFound.lessonId,
      createdAt: contentFound.createdAt,
    });

    try {
      await updatedContent.generatePresignedUrl();

      await this.contentRepo.updateContent(updatedContent);

      return {
        content: updatedContent,
      };
    } catch {
      throw new InternalServerHTTPError('Algo deu errado ao atualizar o conte;udo');
    }
  }
}
