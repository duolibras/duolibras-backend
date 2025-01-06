import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { ModuleMapper } from '../../mappers/module-mapper';
import { GetModulesUseCase } from './get-modules-use-case';

const schema = z.object({
  lessonId: z.string().ulid(),
});

export class GetModulesController implements IController {
  constructor(
    private readonly useCase: GetModulesUseCase,
  ) {}

  async handle({ params }: IHttpRequest): Promise<IHttpResponse> {
    const { lessonId } = schema.parse(params);

    const { modules } = await this.useCase.execute({ lessonId });

    return new HttpResponse({
      body: {
        modules: modules.map(ModuleMapper.toSummaryHttp),
      }
    }).ok();
  }
}
