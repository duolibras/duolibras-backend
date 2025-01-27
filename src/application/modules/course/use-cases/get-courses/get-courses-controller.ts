import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { CourseMapper } from '../../mappers/course-mapper';
import { GetCoursesUseCase } from './get-courses-use-case';

const queryBooleanSchema = z.string().optional().transform(value => {
  if (value === undefined) return undefined;
  if (value === 'true') return true;
  if (value === 'false') return false;
  throw new Error('Owned must be a boolean (true or false)');
});

const schema = z.object({
  accountId: z.string().ulid(),
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
