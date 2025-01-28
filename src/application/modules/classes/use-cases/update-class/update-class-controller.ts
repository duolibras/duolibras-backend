import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { presignedPostFileSchema } from '@/application/shared/schemas/presigned-post-file-schema';
import { z } from 'zod';
import { ClassMapper } from '../../mappers/class-mapper';
import { UpdateClassUseCase } from './update-class-use-case';

const schema = z.object({
  classId: z.string().ulid(),
  accountId: z.string().ulid(),
  name: z.string().optional(),
  description: z.string().optional(),
  files: z.object({
    banner: presignedPostFileSchema.optional(),
    video: presignedPostFileSchema.optional(),
  }).optional(),
});

export class UpdateClassController implements IController {
  constructor(
    private readonly useCase: UpdateClassUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const parsedBody = schema.parse({
      accountId: request.account?.id,
      ...request.body,
      ...request.params,
    });

    const { courseClass } = await this.useCase.execute(parsedBody);

    return new HttpResponse({
      body: {
        courseClass: ClassMapper.toHttp(courseClass)
      }
    }).ok();
  }
}
