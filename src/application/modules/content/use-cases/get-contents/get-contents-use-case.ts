import { LessonRepository } from '@/application/modules/lesson/repositories/lesson-repository';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Content } from '../../entities/content';
import { ContentRepository } from '../../repositories/content-repository';

interface IInput {
  lessonId: string;
}

interface IOutput {
  contents: Content[];
}

export class GetContentsUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly contentRepo: ContentRepository,
    private readonly lessonRepo: LessonRepository,
  ) {}

  async execute({ lessonId }: IInput): Promise<IOutput> {
    const lesson = await this.lessonRepo.getLesson(lessonId);

    if (!lesson) {
      throw new NotFoundHTTPError('Aula não encontrado');
    }

    const contents = await this.contentRepo.getContents(lessonId);

    return {
      contents
    };
  }
}
