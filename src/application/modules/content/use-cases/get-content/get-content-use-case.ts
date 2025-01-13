import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Content } from '../../entities/content';
import { ContentRepository } from '../../repositories/content-repository';

interface IInput {
  contentId: string;
}

interface IOutput {
  content: Content;
}

export class GetContentUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly contentRepo: ContentRepository,
  ) {}

  async execute({ contentId }: IInput): Promise<IOutput> {
    const content = await this.contentRepo.getContent(contentId);

    if (!content) {
      throw new NotFoundHTTPError('Conteúdo não encontrado');
    }

    return {
      content,
    };
  }
}
