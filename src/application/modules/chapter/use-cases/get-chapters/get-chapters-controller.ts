import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { ChapterMapper } from '../../mappers/chapter-mapper';
import { GetChaptersUseCase } from './get-chapters-use-case';

const schema = z.object({
  unitId: z.string().ulid(),
});

export class GetChaptersController implements IController {
  constructor(
    private readonly useCase: GetChaptersUseCase,
  ) {}

  async handle({ params }: IHttpRequest): Promise<IHttpResponse> {
    const { unitId } = schema.parse(params);

    const { chapters } = await this.useCase.execute({ unitId });

    return new HttpResponse({
      body: {
        chapters: chapters.map(ChapterMapper.toSummaryHttp),
      }
    }).ok();
  }
}
