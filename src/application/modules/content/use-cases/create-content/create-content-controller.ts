import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { ContentMapper } from '../../mappers/content-mapper';
import { CreateContentUseCase } from './create-content-use-case';

const schema = z.object({
  name: z.string(),
  description: z.string(),
  lessonId: z.string().ulid(),
  video: z.object({ path: z.string() }).transform(v => v.path),
});

export class CreateContentController implements IController {
  constructor(
    private readonly useCase: CreateContentUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const video = request.file;

    const parsedBody = schema.parse({
      ...request.body,
      video,
    });

    const { content } = await this.useCase.execute(parsedBody);

    return new HttpResponse({
      body: {
        content: ContentMapper.toHttp(content),
      }
    }).created();
  }
}
