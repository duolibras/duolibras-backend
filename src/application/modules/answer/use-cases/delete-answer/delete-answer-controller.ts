import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { DeleteAnswerUseCase } from './delete-answer-use-case';

const schema = z.object({
  answerId: z.string().ulid(),
});

export class DeleteAnswerController implements IController {
  constructor(
    private readonly useCase: DeleteAnswerUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { answerId } = schema.parse({ ...request.params });

    await this.useCase.execute({ answerId });

    return new HttpResponse().noContent();
  }
}
