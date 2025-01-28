import { Roles } from '@/application/modules/account/entities/account';
import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { GetClassVideoUseCase } from './get-class-video-use-case';

const schema = z.object({
  classId: z.string().ulid(),
  accountId: z.string().ulid(),
  role: z.nativeEnum(Roles),
});

export class GetClassVideoController implements IController {
  constructor(
    private readonly useCase: GetClassVideoUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const parsedBody = schema.parse({
      accountId: request.account?.id,
      role: request.account?.role,
      ...request.params,
    });

    const { videoUrl } = await this.useCase.execute(parsedBody);

    return new HttpResponse({
      body: {
        videoUrl
      }
    }).ok();
  }
}
