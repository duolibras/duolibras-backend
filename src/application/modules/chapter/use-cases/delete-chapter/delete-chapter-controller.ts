import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { DeleteChapterUseCase } from './delete-chapter-use-case';

const schema = z.object({
  chapterId: z.string().ulid(),
});

export class DeleteChapterController implements IController {
  constructor(
    private readonly useCase: DeleteChapterUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { chapterId } = schema.parse({ ...request.params });

    await this.useCase.execute({ chapterId });

    return new HttpResponse().noContent();
  }
}
