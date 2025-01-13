import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { DeleteContentUseCase } from './delete-content-use-case';

const schema = z.object({
  contentId: z.string().ulid(),
});

export class DeleteContentController implements IController {
  constructor(
    private readonly useCase: DeleteContentUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { contentId } = schema.parse({ ...request.params });

    await this.useCase.execute({ contentId });

    return new HttpResponse().noContent();
  }
}
