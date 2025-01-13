import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { ContentMapper } from '../../mappers/content-mapper';
import { GetContentUseCase } from './get-content-use-case';

const schema = z.object({
  contentId: z.string().ulid(),
});

export class GetContentController implements IController {
  constructor(
    private readonly useCase: GetContentUseCase,
  ) {}

  async handle({ params }: IHttpRequest): Promise<IHttpResponse> {
    const { contentId } = schema.parse(params);

    const { content } = await this.useCase.execute({ contentId });

    return new HttpResponse({
      body: {
        content: ContentMapper.toSummaryHttp(content),
      }
    }).ok();
  }
}
