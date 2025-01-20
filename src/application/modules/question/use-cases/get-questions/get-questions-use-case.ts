import { LessonRepository } from '@/application/modules/lesson/repositories/lesson-repository';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Question } from '../../entities/question';
import { QuestionRepository } from '../../repositories/question-repository';

interface IInput {
  lessonId: string;
}

interface IOutput {
  questions: Question[];
}

export class GetQuestionsUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly questionRepo: QuestionRepository,
    private readonly lessonRepo: LessonRepository,
  ) {}

  async execute({ lessonId }: IInput): Promise<IOutput> {
    const lesson = await this.lessonRepo.getLesson(lessonId);

    if (!lesson) {
      throw new NotFoundHTTPError('Aula não encontrado');
    }

    const questions = await this.questionRepo.getQuestions(lessonId);

    await Promise.all(questions.map((question) => question.generatePresignedUrl()));

    return {
      questions
    };
  }
}
