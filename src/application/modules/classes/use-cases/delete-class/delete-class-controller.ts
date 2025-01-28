import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { DeleteClassUseCase } from './delete-class-use-case';

const schema = z.object({
  classId: z.string().ulid(),
  accountId: z.string().ulid(),
});

export class DeleteClassController implements IController {
  constructor(
    private readonly useCase: DeleteClassUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const parsedBody = schema.parse({
      accountId: request.account?.id,
      ...request.params,
    });

    await this.useCase.execute(parsedBody);

    return new HttpResponse().noContent();
  }
}
