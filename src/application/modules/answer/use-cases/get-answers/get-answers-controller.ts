import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { AnswerMapper } from '../../mappers/answer-mapper';
import { GetAnswersUseCase } from './get-answers-use-case';

const schema = z.object({
  questionId: z.string().ulid(),
});

export class GetAnswersController implements IController {
  constructor(
    private readonly useCase: GetAnswersUseCase,
  ) {}

  async handle({ params }: IHttpRequest): Promise<IHttpResponse> {
    const { questionId } = schema.parse(params);

    const { answers } = await this.useCase.execute({ questionId });

    return new HttpResponse({
      body: {
        answers: answers.map(AnswerMapper.toSummaryHttp),
      }
    }).ok();
  }
}
