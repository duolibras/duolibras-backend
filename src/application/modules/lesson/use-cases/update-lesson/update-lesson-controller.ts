import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { LessonMapper } from '../../mappers/lesson-mapper';
import { UpdateLessonUseCase } from './update-lesson-use-case';

const schema = z.object({
  lessonId: z.string().ulid(),
  name: z.string().optional(),
});

export class UpdateLessonController implements IController {
  constructor(
    private readonly useCase: UpdateLessonUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { lessonId, name } = schema.parse({ ...request.params, ...request.body });

    const { lesson } = await this.useCase.execute({
      lessonId,
      name,
    });

    return new HttpResponse({
      body: { lesson: LessonMapper.toHttp(lesson) }
    }).ok();
  }
}
