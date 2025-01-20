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
  video: z.object({ path: z.string() }).transform(v => v.path).optional(),
  machineLearningModelId: z.string().ulid().optional(),
});

export class UpdateQuestionController implements IController {
  constructor(
    private readonly useCase: UpdateQuestionUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const video = request.file ? request.file : undefined;

    const parsedBody = schema.parse({ ...request.params, ...request.body, video });

    const { question } = await this.useCase.execute(parsedBody);

    return new HttpResponse({
      body: { question: QuestionMapper.toHttp(question) }
    }).ok();
  }
}
