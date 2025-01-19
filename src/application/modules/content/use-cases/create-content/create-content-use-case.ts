
import { LessonRepository } from '@/application/modules/lesson/repositories/lesson-repository';
import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Content } from '../../entities/content';
import { ContentRepository } from '../../repositories/content-repository';

interface IInput {
  name: string;
  description: string;
  videoKey: string;
  lessonId: string;
}

interface IOutput {
  content: Content;
}

export class CreateContentUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly contentRepo: ContentRepository,
    private readonly lessonRepo: LessonRepository,
  ) {}

  async execute({ name, lessonId, description, videoKey }: IInput): Promise<IOutput> {
    const lesson = await this.lessonRepo.getLesson(lessonId);

    if (!lesson) {
      throw new NotFoundHTTPError('Aula não encontrado');
    }

    const content = new Content({
      name,
      description,
      lessonId,
      videoKey,
    });

    try {
      await this.contentRepo.createContent(content);

      await this.lessonRepo.changeModulesCount(lesson.id, 'INCREMENT');

      return {
        content
      };
    } catch {
      throw new InternalServerHTTPError('Erro ao criar conteúdo');
    }
  }
}
