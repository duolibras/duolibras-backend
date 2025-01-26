import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { CourseMapper } from '../../mappers/course-mapper';
import { CreateCourseUseCase } from './create-course-use-case';

const schema = z.object({
  name: z.string(),
  description: z.string(),
  accountId: z.string(),
  preemium: z.boolean(),
  priceInCents: z.number(),
});

export class CreateCourseController implements IController {
  constructor(
    private readonly useCase: CreateCourseUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const parsedBody = schema.parse({
      accountId: request.account?.id,
      ...request.body,
    });

    const { course } = await this.useCase.execute(parsedBody);

    return new HttpResponse({
      body: CourseMapper.toHttp(course)
    }).created();
  }
}
