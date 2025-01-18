import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Answer } from '../../entities/answer';
import { AnswerRepository } from '../../repositories/answer-repository';

interface IInput {
  answerId: string;
  isCorrect?: boolean;
  description?: string;
  videoUrl?: string;
}

interface IOutput {
  answer: Answer;
}

export class UpdateAnswerUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly answerRepo: AnswerRepository
  ) {}

  async execute({ answerId, isCorrect, description, videoUrl }: IInput): Promise<IOutput> {
    const answerFound = await this.answerRepo.getAnswer(answerId);

    if (!answerFound) {
      throw new NotFoundHTTPError('Resposta não encontrada');
    }

    const updatedAnswer = new Answer({
      id: answerFound.id,
      description: description ?? answerFound.description,
      videoUrl: videoUrl ?? answerFound.videoUrl,
      questionId: answerFound.questionId,
      createdAt: answerFound.createdAt,
      isCorrect: isCorrect ?? answerFound.isCorrect,
    });

    try {
      await this.answerRepo.updateAnswer(updatedAnswer);

      return {
        answer: updatedAnswer,
      };
    } catch {
      throw new InternalServerHTTPError('Algo deu errado ao atualizar a resposta');
    }
  }
}
