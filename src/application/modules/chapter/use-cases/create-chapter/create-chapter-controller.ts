import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { ChapterMapper } from '../../mappers/chapter-mapper';
import { CreateChapterUseCase } from './create-chapter-use-case';

const schema = z.object({
  name: z.string(),
  description: z.string(),
  unitId: z.string().ulid(),
});

export class CreateChapterController implements IController {
  constructor(
    private readonly useCase: CreateChapterUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { name, description, unitId } = schema.parse(request.body);

    const { chapter } = await this.useCase.execute({ name, description, unitId });

    return new HttpResponse({
      body: {
        chapter: ChapterMapper.toHttp(chapter),
      }
    }).created();
  }
}
