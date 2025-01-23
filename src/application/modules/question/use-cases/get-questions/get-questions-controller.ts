import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { QuestionMapper } from '../../mappers/question-mapper';
import { GetQuestionsUseCase } from './get-questions-use-case';

const schema = z.object({
  lessonId: z.string().ulid(),
});

export class GetQuestionsController implements IController {
  constructor(
    private readonly useCase: GetQuestionsUseCase,
  ) {}

  async handle({ params }: IHttpRequest): Promise<IHttpResponse> {
    const { lessonId } = schema.parse(params);

    const { questions } = await this.useCase.execute({ lessonId });

    return new HttpResponse({
      body: {
        questions: questions.map(QuestionMapper.toSummaryHttp),
      }
    }).ok();
  }
}
