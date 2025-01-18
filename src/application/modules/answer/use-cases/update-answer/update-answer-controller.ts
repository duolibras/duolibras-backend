import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { AnswerMapper } from '../../mappers/answer-mapper';
import { UpdateAnswerUseCase } from './update-answer-use-case';

const schema = z.object({
  answerId: z.string().ulid(),
  isCorrect: z.boolean().optional(),
  description: z.string().optional(),
  videoUrl: z.string().url().optional(),
});

export class UpdateAnswerController implements IController {
  constructor(
    private readonly useCase: UpdateAnswerUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { answerId, isCorrect, videoUrl, description } = schema.parse({ ...request.params, ...request.body });

    const { answer } = await this.useCase.execute({
      answerId,
      isCorrect,
      description,
      videoUrl,
    });

    return new HttpResponse({
      body: { answer: AnswerMapper.toHttp(answer) }
    }).ok();
  }
}
