import { ChapterRepository } from '@/application/modules/chapter/repositories/chapter-repository';
import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { LessonRepository } from '../../repositories/lesson-repository';

interface IInput {
  lessonId: string;
}

type IOutput = void;

export class DeleteLessonUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly lessonRepo: LessonRepository,
    private readonly chapterRepo: ChapterRepository,
  ) {}

  async execute({ lessonId }: IInput): Promise<void> {
    const lesson = await this.lessonRepo.getLesson(lessonId);

    if (!lesson) {
      throw new NotFoundHTTPError('Aula não encontrada');
    }

    const chapter = await this.chapterRepo.getChapter(lesson.chapterId);

    if (!chapter) {
      throw new NotFoundHTTPError('Capítulo não encontrado');
    }

    try {
      await this.lessonRepo.deleteLesson(lessonId);

      await this.chapterRepo.changeLessonsCount(chapter, 'DECREMENT');
    } catch {
      throw new InternalServerHTTPError('Ocorreu um erro ao excluir aula');
    }
  }
}
