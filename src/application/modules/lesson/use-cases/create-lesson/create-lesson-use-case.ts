
import { ChapterRepository } from '@/application/modules/chapter/repositories/chapter-repository';
import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Lesson } from '../../entities/lesson';
import { LessonRepository } from '../../repositories/lesson-repository';

interface IInput {
  name: string;
  chapterId: string;
}

interface IOutput {
  lesson: Lesson;
}

export class CreateLessonUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly lessonRepo: LessonRepository,
    private readonly chapterRepo: ChapterRepository,
  ) {}

  async execute({ name, chapterId }: IInput): Promise<IOutput> {
    const chapter = await this.chapterRepo.getChapter(chapterId);

    if (!chapter) {
      throw new NotFoundHTTPError('Capítulo não encontrado');
    }

    const lesson = new Lesson({
      name,
      chapterId,
      modulesCount: 0,
    });

    try {
      await this.lessonRepo.createLesson(lesson);

      await this.chapterRepo.changeLessonsCount(chapter, 'INCREMENT');

      return {
        lesson
      };
    } catch {
      throw new InternalServerHTTPError('Erro ao criar aula');
    }
  }
}
