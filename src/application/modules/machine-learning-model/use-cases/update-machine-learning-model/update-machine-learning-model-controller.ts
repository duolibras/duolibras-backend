import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { MachineLearningModelMapper } from '../../mappers/machine-learning-model-mapper';
import { UpdateMachineLearningModelUseCase } from './update-machine-learning-model-use-case';

const schema = z.object({
  machineLearningModelId: z.string().ulid(),
  name: z.string().optional(),
  description: z.string().optional(),
  metadataUrl: z.string().optional(),
  modelUrl: z.string().optional(),
  weightsUrl: z.string().optional(),
});

export class UpdateMachineLearningModelController implements IController {
  constructor(
    private readonly useCase: UpdateMachineLearningModelUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const {
      machineLearningModelId,
      name,
      description,
      metadataUrl,
      modelUrl,
      weightsUrl,
    } = schema.parse({ ...request.params, ...request.body });

    const { machinelearningmodel } = await this.useCase.execute({
      machineLearningModelId,
      name,
      description,
      metadataUrl,
      modelUrl,
      weightsUrl
    });

    return new HttpResponse({
      body: { machinelearningmodel: MachineLearningModelMapper.toHttp(machinelearningmodel) }
    }).ok();
  }
}
