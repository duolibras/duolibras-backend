import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { queryBooleanSchema } from '@/application/shared/schemas/query-boolean-schema';
import { z } from 'zod';
import { CourseMapper } from '../../mappers/course-mapper';
import { GetCoursesUseCase } from './get-courses-use-case';

const schema = z.object({
  accountId: z.string().ulid().optional(),
  teacherId: z.string().ulid().optional(),
  owned: queryBooleanSchema,
  creator: queryBooleanSchema,
  archived: queryBooleanSchema,
});

export class GetCoursesController implements IController {
  constructor(
    private readonly useCase: GetCoursesUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const parsedBody = schema.parse({
      accountId: request.account?.id,
      ...request.query,
    });


    const { courses } = await this.useCase.execute(parsedBody);

    return new HttpResponse({
      body: {
        courses: courses.map(CourseMapper.toSummaryHttp)
      }
    }).ok();
  }
}
