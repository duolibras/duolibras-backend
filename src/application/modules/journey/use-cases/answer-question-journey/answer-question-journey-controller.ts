import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { AnswerQuestionJourneyUseCase } from './answer-question-journey-use-case';

const schema = z.object({
  questionId: z.string().ulid(),
  answerId: z.string().ulid(),
});

export class AnswerQuestionJourneyController implements IController {
  constructor(
    private readonly useCase: AnswerQuestionJourneyUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const parsedBody = schema.parse(request.params);

    await this.useCase.execute(parsedBody);

    return new HttpResponse({
      body: {
        message: 'Resposta certa!'
      }
    }).ok();
  }
}
