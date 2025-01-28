import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { presignedPostFileSchema } from '@/application/shared/schemas/presigned-post-file-schema';
import { z } from 'zod';
import { ClassMapper } from '../../mappers/class-mapper';
import { CreateClassUseCase } from './create-class-use-case';

const schema = z.object({
  name: z.string(),
  description: z.string(),
  courseId: z.string().ulid(),
  accountId: z.string().ulid(),
  archived: z.boolean().optional().transform(v => !!v),
  files: z.object({
    banner: presignedPostFileSchema.optional(),
    video: presignedPostFileSchema.optional(),
  }).optional(),
});

export class CreateClassController implements IController {
  constructor(
    private readonly useCase: CreateClassUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const parsedBody = schema.parse({
      accountId: request.account?.id,
      ...request.body,
    });

    const { courseClass } = await this.useCase.execute(parsedBody);

    return new HttpResponse({
      body: {
        courseClass: ClassMapper.toHttp(courseClass)
      }
    }).created();
  }
}
