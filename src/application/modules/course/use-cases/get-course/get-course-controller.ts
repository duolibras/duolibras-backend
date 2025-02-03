import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { CourseMapper } from '../../mappers/course-mapper';
import { GetCourseUseCase } from './get-course-use-case';

const schema = z.object({
  courseId: z.string().ulid(),
});

export class GetCourseController implements IController {
  constructor(
    private readonly useCase: GetCourseUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const parsedBody = schema.parse({
      ...request.params,
    });


    const { course } = await this.useCase.execute(parsedBody);

    return new HttpResponse({
      body: {
        course: CourseMapper.toSummaryHttp(course)
      }
    }).ok();
  }
}
