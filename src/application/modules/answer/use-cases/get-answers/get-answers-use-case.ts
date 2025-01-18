import { QuestionRepository } from '@/application/modules/question/repositories/question-repository';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Answer } from '../../entities/answer';
import { AnswerRepository } from '../../repositories/answer-repository';

interface IInput {
  questionId: string;
}

interface IOutput {
  answers: Answer[];
}

export class GetAnswersUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly answerRepo: AnswerRepository,
    private readonly questionRepo: QuestionRepository,
  ) {}

  async execute({ questionId }: IInput): Promise<IOutput> {
    const question = await this.questionRepo.getQuestion(questionId);

    if (!question) {
      throw new NotFoundHTTPError('Questão não encontrado');
    }

    const answers = await this.answerRepo.getAnswers(questionId);

    return {
      answers
    };
  }
}
