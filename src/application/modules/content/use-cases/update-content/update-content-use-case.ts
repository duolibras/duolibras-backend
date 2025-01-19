import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Content } from '../../entities/content';
import { ContentRepository } from '../../repositories/content-repository';

interface IInput {
  contentId: string;
  name?: string;
  description?: string;
  videoKey?: string;
}

interface IOutput {
  content: Content;
}

export class UpdateContentUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly contentRepo: ContentRepository
  ) {}

  async execute({ contentId, name, description, videoKey }: IInput): Promise<IOutput> {
    const contentFound = await this.contentRepo.getContent(contentId);

    if (!contentFound) {
      throw new NotFoundHTTPError('Conteúdo não encontrado');
    }

    const updatedContent = new Content({
      id: contentFound.id,
      name: name ?? contentFound.name,
      description: description ?? contentFound.description,
      videoKey: videoKey ?? contentFound.videoKey,
      lessonId: contentFound.lessonId,
      createdAt: contentFound.createdAt,
    });

    try {
      await this.contentRepo.updateContent(updatedContent);

      return {
        content: updatedContent,
      };
    } catch {
      throw new InternalServerHTTPError('Algo deu errado ao atualizar o conte;udo');
    }
  }
}
