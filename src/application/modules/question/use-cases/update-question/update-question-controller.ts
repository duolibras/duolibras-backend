import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { QuestionMapper } from '../../mappers/question-mapper';
import { UpdateQuestionUseCase } from './update-question-use-case';

const schema = z.object({
  questionId: z.string().ulid(),
  name: z.string().optional(),
  description: z.string().optional(),
  videoKey: z.string().url().optional(),
});

export class UpdateQuestionController implements IController {
  constructor(
    private readonly useCase: UpdateQuestionUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { questionId, name, videoKey, description } = schema.parse({ ...request.params, ...request.body });

    const { question } = await this.useCase.execute({
      questionId,
      name,
      description,
      videoKey,
    });

    return new HttpResponse({
      body: { question: QuestionMapper.toHttp(question) }
    }).ok();
  }
}
