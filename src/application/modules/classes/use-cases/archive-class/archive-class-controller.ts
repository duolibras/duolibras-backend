import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { ArchiveClassUseCase } from './archive-class-use-case';

const schema = z.object({
  accountId: z.string().ulid(),
  classId: z.string().ulid(),
});

export class ArchiveClassController implements IController {
  constructor(
    private readonly useCase: ArchiveClassUseCase
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
