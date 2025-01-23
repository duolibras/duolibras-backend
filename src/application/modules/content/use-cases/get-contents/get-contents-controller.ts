import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { ContentMapper } from '../../mappers/content-mapper';
import { GetContentsUseCase } from './get-contents-use-case';

const schema = z.object({
  lessonId: z.string().ulid(),
});

export class GetContentsController implements IController {
  constructor(
    private readonly useCase: GetContentsUseCase,
  ) {}

  async handle({ params }: IHttpRequest): Promise<IHttpResponse> {
    const { lessonId } = schema.parse(params);

    const { contents } = await this.useCase.execute({ lessonId });

    return new HttpResponse({
      body: {
        contents: contents.map(ContentMapper.toSummaryHttp),
      }
    }).ok();
  }
}
