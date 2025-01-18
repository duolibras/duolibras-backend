
import { QuestionRepository } from '@/application/modules/question/repositories/question-repository';
import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Answer } from '../../entities/answer';
import { AnswerRepository } from '../../repositories/answer-repository';

interface IInput {
  questionId: string;
  isCorrect: boolean;
  description?: string;
  videoUrl?: string;
}

interface IOutput {
  answer: Answer;
}

export class CreateAnswerUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly answerRepo: AnswerRepository,
    private readonly questionRepo: QuestionRepository,
  ) {}

  async execute({ isCorrect, questionId, description, videoUrl }: IInput): Promise<IOutput> {
    const question = await this.questionRepo.getQuestion(questionId);

    if (!question) {
      throw new NotFoundHTTPError('Questão não encontrada');
    }

    const answer = new Answer({
      description,
      questionId,
      videoUrl,
      isCorrect,
    });

    try {
      await this.answerRepo.createAnswer(answer);

      return {
        answer
      };
    } catch {
      throw new InternalServerHTTPError('Erro ao criar resposta');
    }
  }
}
