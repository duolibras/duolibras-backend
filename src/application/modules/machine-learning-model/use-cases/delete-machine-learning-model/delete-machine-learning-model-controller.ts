import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { DeleteMachineLearningModelUseCase } from './delete-machine-learning-model-use-case';

const schema = z.object({
  machineLearningModelId: z.string().ulid(),
});

export class DeleteMachineLearningModelController implements IController {
  constructor(
    private readonly useCase: DeleteMachineLearningModelUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { machineLearningModelId } = schema.parse({ ...request.params });

    await this.useCase.execute({ machineLearningModelId });

    return new HttpResponse().noContent();
  }
}
