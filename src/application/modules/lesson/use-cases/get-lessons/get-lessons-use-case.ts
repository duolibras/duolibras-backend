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
  ) {}

  async execute({ chapterId }: IInput): Promise<IOutput> {
    const lessons = await this.lessonRepo.getLessons(chapterId);

    return {
      lessons
    };
  }
}
