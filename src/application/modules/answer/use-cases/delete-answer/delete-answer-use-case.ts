import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { AnswerRepository } from '../../repositories/answer-repository';

interface IInput {
  answerId: string;
}

type IOutput = void;

export class DeleteAnswerUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly answerRepo: AnswerRepository,
  ) {}

  async execute({ answerId }: IInput): Promise<void> {
    const answer = await this.answerRepo.getAnswer(answerId);

    if (!answer) {
      throw new NotFoundHTTPError('Resposta não encontrada');
    }

    try {
      await this.answerRepo.deleteAnswer(answerId);

    } catch {
      throw new InternalServerHTTPError('Ocorreu um erro ao excluir resposta');
    }
  }
}
