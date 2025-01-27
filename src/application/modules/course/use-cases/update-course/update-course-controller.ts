import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { presignedPostFileSchema } from '@/application/shared/schemas/presigned-post-file-schema';
import { z } from 'zod';
import { CourseMapper } from '../../mappers/course-mapper';
import { UpdateCourseUseCase } from './update-course-use-case';

const schema = z.object({
  accountId: z.string().ulid(),
  courseId: z.string().ulid(),
  name: z.string().optional(),
  description: z.string().optional(),
  preemium: z.boolean().optional(),
  priceInCents: z.number().optional(),
  files: z.object({
    banner: presignedPostFileSchema.optional(),
    video: presignedPostFileSchema.optional(),
  }).optional(),
});

export class UpdateCourseController implements IController {
  constructor(
    private readonly useCase: UpdateCourseUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const parsedBody = schema.parse({
      ...request.body,
      ...request.params,
      accountId: request.account?.id,
    });

    const { course } = await this.useCase.execute(parsedBody);

    return new HttpResponse({
      body: {
        course: CourseMapper.toHttp(course),
      }
    }).ok();
  }
}
