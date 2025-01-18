import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { AnswerMapper } from '../../mappers/answer-mapper';
import { CreateAnswerUseCase } from './create-answer-use-case';

const schema = z.object({
  description: z.string().optional(),
  videoUrl: z.string().optional(),
  isCorrect: z.boolean(),
  questionId: z.string().ulid(),
});

export class CreateAnswerController implements IController {
  constructor(
    private readonly useCase: CreateAnswerUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { description, questionId, videoUrl, isCorrect } = schema.parse(request.body);

    const { answer } = await this.useCase.execute({ description, questionId, videoUrl, isCorrect });

    return new HttpResponse({
      body: {
        answer: AnswerMapper.toHttp(answer),
      }
    }).created();
  }
}
