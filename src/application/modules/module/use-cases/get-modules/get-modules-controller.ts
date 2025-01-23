import { Roles } from '@/application/modules/auth/entities/account';
import { MachineLearningModelMapper } from '@/application/modules/machine-learning-model/mappers/machine-learning-model-mapper';
import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { ModuleMapper } from '../../mappers/module-mapper';
import { GetModulesUseCase } from './get-modules-use-case';

const schema = z.object({
  lessonId: z.string().ulid(),
  accountRole: z.nativeEnum(Roles),
  accountId: z.string().ulid(),
});

export class GetModulesController implements IController {
  constructor(
    private readonly useCase: GetModulesUseCase,
  ) {}

  async handle({ params, account }: IHttpRequest): Promise<IHttpResponse> {
    const parsedBody = schema.parse({
      ...params,
      accountRole: account?.role,
      accountId: account?.id,
    });

    const { modules, lessonMachineLearningModels } = await this.useCase.execute(parsedBody);

    return new HttpResponse({
      body: {
        modules: modules.map(ModuleMapper.toSummaryHttp),
        lessonMachineLearningModels: lessonMachineLearningModels.map(MachineLearningModelMapper.toSummaryHttp),
      }
    }).ok();
  }
}
