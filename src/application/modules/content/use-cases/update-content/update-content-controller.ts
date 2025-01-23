import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { ContentMapper } from '../../mappers/content-mapper';
import { UpdateContentUseCase } from './update-content-use-case';

const schema = z.object({
  contentId: z.string().ulid(),
  name: z.string().optional(),
  description: z.string().optional(),
  video: z.object({ path: z.string() }).transform(v => v.path).optional(),
});

export class UpdateContentController implements IController {
  constructor(
    private readonly useCase: UpdateContentUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const video = request.file;
    const parsedBody = schema.parse({ ...request.params, ...request.body, video });

    const { content } = await this.useCase.execute(parsedBody);

    return new HttpResponse({
      body: { content: ContentMapper.toHttp(content) }
    }).ok();
  }
}
