import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { GetCoursePreviewUseCase } from './get-course-preview-use-case';

const schema = z.object({
  courseId: z.string().ulid(),
});

export class GetCoursePreviewController implements IController {
  constructor(
    private readonly useCase: GetCoursePreviewUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { courseId } = schema.parse(request.params);

    const { videoUrl } = await this.useCase.execute({ courseId });

    return new HttpResponse({
      body: {
        previewUrl: videoUrl
      }
    }).ok();
  }
}
