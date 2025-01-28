import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { ArchiveCourseUseCase } from './archive-course-use-case';

const schema = z.object({
  accountId: z.string().ulid(),
  courseId: z.string().ulid(),
});

export class ArchiveCourseController implements IController {
  constructor(
    private readonly useCase: ArchiveCourseUseCase
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
