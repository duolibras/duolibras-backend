import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { ChapterMapper } from '../../mappers/chapter-mapper';
import { UpdateChapterUseCase } from './update-chapter-use-case';

const schema = z.object({
  chapterId: z.string().ulid(),
  name: z.string().optional(),
  description: z.string().optional(),
});

export class UpdateChapterController implements IController {
  constructor(
    private readonly useCase: UpdateChapterUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { chapterId, name, description } = schema.parse({ ...request.params, ...request.body });

    const { chapter } = await this.useCase.execute({
      chapterId,
      name,
      description,
    });

    return new HttpResponse({
      body: { chapter: ChapterMapper.toHttp(chapter) }
    }).ok();
  }
}
