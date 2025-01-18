import { LessonRepository } from '@/application/modules/lesson/repositories/lesson-repository';
import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { QuestionRepository } from '../../repositories/question-repository';

interface IInput {
  questionId: string;
}

type IOutput = void;

export class DeleteQuestionUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly questionRepo: QuestionRepository,
    private readonly lessonRepo: LessonRepository,
  ) {}

  async execute({ questionId }: IInput): Promise<void> {
    const question = await this.questionRepo.getQuestion(questionId);

    if (!question) {
      throw new NotFoundHTTPError('Questão não encontrada');
    }

    try {
      await this.questionRepo.deleteQuestion(questionId);

      await this.lessonRepo.changeModulesCount(question.lessonId, 'DECREMENT');

    } catch {
      throw new InternalServerHTTPError('Ocorreu um erro ao excluir questão');
    }
  }
}
