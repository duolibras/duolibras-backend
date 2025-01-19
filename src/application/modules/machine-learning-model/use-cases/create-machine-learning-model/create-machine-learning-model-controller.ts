import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { MachineLearningModelMapper } from '../../mappers/machine-learning-model-mapper';
import { CreateMachineLearningModelUseCase } from './create-machine-learning-model-use-case';

const schema = z.object({
  name: z.string(),
  description: z.string(),
  metadataUrl: z.string(),
  modelUrl: z.string(),
  weightsUrl: z.string(),
});

export class CreateMachineLearningModelController implements IController {
  constructor(
    private readonly useCase: CreateMachineLearningModelUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { name, description, metadataUrl, modelUrl, weightsUrl } = schema.parse(request.body);

    const { machinelearningmodel } = await this.useCase.execute({
      name, description, metadataUrl, modelUrl, weightsUrl
    });

    return new HttpResponse({
      body: {
        machinelearningmodel: MachineLearningModelMapper.toHttp(machinelearningmodel),
      }
    }).created();
  }
}
