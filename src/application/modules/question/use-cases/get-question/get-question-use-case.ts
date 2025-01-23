import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Question } from '../../entities/question';
import { QuestionRepository } from '../../repositories/question-repository';

interface IInput {
  questionId: string;
}

interface IOutput {
  question: Question;
}

export class GetQuestionUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly questionRepo: QuestionRepository,
  ) {}

  async execute({ questionId }: IInput): Promise<IOutput> {
    const question = await this.questionRepo.getQuestion(questionId);

    if (!question) {
      throw new NotFoundHTTPError('Questão não encontrado');
    }

    await question.generatePresignedUrl();

    return {
      question,
    };
  }
}
