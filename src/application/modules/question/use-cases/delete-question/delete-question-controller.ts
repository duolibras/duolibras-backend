import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { DeleteQuestionUseCase } from './delete-question-use-case';

const schema = z.object({
  questionId: z.string().ulid(),
});

export class DeleteQuestionController implements IController {
  constructor(
    private readonly useCase: DeleteQuestionUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { questionId } = schema.parse({ ...request.params });

    await this.useCase.execute({ questionId });

    return new HttpResponse().noContent();
  }
}
