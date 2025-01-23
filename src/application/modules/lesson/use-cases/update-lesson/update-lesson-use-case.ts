import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Lesson } from '../../entities/lesson';
import { LessonRepository } from '../../repositories/lesson-repository';

interface IInput {
  lessonId: string;
  name?: string;
}

interface IOutput {
  lesson: Lesson;
}

export class UpdateLessonUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly lessonRepo: LessonRepository
  ) {}

  async execute({ lessonId, name }: IInput): Promise<IOutput> {
    const lessonFound = await this.lessonRepo.getLesson(lessonId);

    if (!lessonFound) {
      throw new NotFoundHTTPError('Aula não encontrada');
    }

    const updatedLesson = new Lesson({
      id: lessonFound.id,
      name: name ?? lessonFound.name,
      chapterId: lessonFound.chapterId,
      modulesCount: lessonFound.modulesCount,
      createdAt: lessonFound.createdAt,
    });

    try {
      await this.lessonRepo.updateLesson(updatedLesson);

      return {
        lesson: updatedLesson,
      };
    } catch {
      throw new InternalServerHTTPError('Algo deu errado ao atualizar a aula');
    }
  }
}
