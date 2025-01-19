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
  videoKey: z.string().url().optional(),
});

export class UpdateContentController implements IController {
  constructor(
    private readonly useCase: UpdateContentUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { contentId, name, videoKey, description } = schema.parse({ ...request.params, ...request.body });

    const { content } = await this.useCase.execute({
      contentId,
      name,
      description,
      videoKey,
    });

    return new HttpResponse({
      body: { content: ContentMapper.toHttp(content) }
    }).ok();
  }
}
