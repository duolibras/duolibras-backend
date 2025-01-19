import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { MachineLearningModelMapper } from '../../mappers/machine-learning-model-mapper';
import { GetMachineLearningModelsUseCase } from './get-machine-learning-models-use-case';

export class GetMachineLearningModelsController implements IController {
  constructor(
    private readonly useCase: GetMachineLearningModelsUseCase,
  ) {}

  async handle(_request: IHttpRequest): Promise<IHttpResponse> {
    const { machineLearningModels } = await this.useCase.execute();

    return new HttpResponse({
      body: {
        machineLearningModels: machineLearningModels.map(MachineLearningModelMapper.toSummaryHttp),
      }
    }).ok();
  }
}
