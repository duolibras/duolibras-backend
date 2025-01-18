import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { QuestionMapper } from '../../mappers/question-mapper';
import { GetQuestionUseCase } from './get-question-use-case';

const schema = z.object({
  questionId: z.string().ulid(),
});

export class GetQuestionController implements IController {
  constructor(
    private readonly useCase: GetQuestionUseCase,
  ) {}

  async handle({ params }: IHttpRequest): Promise<IHttpResponse> {
    const { questionId } = schema.parse(params);

    const { question } = await this.useCase.execute({ questionId });

    return new HttpResponse({
      body: {
        question: QuestionMapper.toSummaryHttp(question),
      }
    }).ok();
  }
}
