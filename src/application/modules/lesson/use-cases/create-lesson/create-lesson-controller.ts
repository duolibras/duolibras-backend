import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { LessonMapper } from '../../mappers/lesson-mapper';
import { CreateLessonUseCase } from './create-lesson-use-case';

const schema = z.object({
  name: z.string(),
  chapterId: z.string().ulid(),
});

export class CreateLessonController implements IController {
  constructor(
    private readonly useCase: CreateLessonUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { name, chapterId } = schema.parse(request.body);

    const { lesson } = await this.useCase.execute({ name, chapterId });

    return new HttpResponse({
      body: {
        lesson: LessonMapper.toHttp(lesson),
      }
    }).created();
  }
}
