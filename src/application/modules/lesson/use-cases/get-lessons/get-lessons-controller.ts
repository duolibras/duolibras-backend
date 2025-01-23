import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { LessonMapper } from '../../mappers/lesson-mapper';
import { GetLessonsUseCase } from './get-lessons-use-case';

const schema = z.object({
  chapterId: z.string().ulid(),
});

export class GetLessonsController implements IController {
  constructor(
    private readonly useCase: GetLessonsUseCase,
  ) {}

  async handle({ params }: IHttpRequest): Promise<IHttpResponse> {
    const { chapterId } = schema.parse(params);

    const { lessons } = await this.useCase.execute({ chapterId });

    return new HttpResponse({
      body: {
        lessons: lessons.map(LessonMapper.toSummaryHttp),
      }
    }).ok();
  }
}
