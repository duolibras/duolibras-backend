import { ChapterRepository } from '@/application/modules/chapter/repositories/chapter-repository';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Lesson } from '../../entities/lesson';
import { LessonRepository } from '../../repositories/lesson-repository';

interface IInput {
  chapterId: string;
}

interface IOutput {
  lessons: Lesson[];
}

export class GetLessonsUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly lessonRepo: LessonRepository,
    private readonly chapterRepo: ChapterRepository,
  ) {}

  async execute({ chapterId }: IInput): Promise<IOutput> {
    const chapter = await this.chapterRepo.getChapter(chapterId);

    if (!chapter) {
      throw new NotFoundHTTPError('Capítulo não encontrado');
    }

    const lessons = await this.lessonRepo.getLessons(chapterId);

    return {
      lessons
    };
  }
}
