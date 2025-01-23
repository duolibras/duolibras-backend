import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { DeleteLessonUseCase } from './delete-lesson-use-case';

const schema = z.object({
  lessonId: z.string().ulid(),
});

export class DeleteLessonController implements IController {
  constructor(
    private readonly useCase: DeleteLessonUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { lessonId } = schema.parse({ ...request.params });

    await this.useCase.execute({ lessonId });

    return new HttpResponse().noContent();
  }
}
