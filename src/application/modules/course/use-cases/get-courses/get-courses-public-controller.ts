import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { CourseMapper } from '../../mappers/course-mapper';
import { GetCoursesUseCase } from './get-courses-use-case';

export class GetCoursesPublicController implements IController {
  constructor(
    private readonly useCase: GetCoursesUseCase
  ) {}

  async handle(_request: IHttpRequest): Promise<IHttpResponse> {
    const { courses } = await this.useCase.execute({});

    return new HttpResponse({
      body: {
        courses: courses.map(CourseMapper.toSummaryHttp)
      }
    }).ok();
  }
}
