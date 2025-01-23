import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { MixedFiles } from '@/application/shared/http/middlewares/file-upload/shared';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { MachineLearningModelMapper } from '../../mappers/machine-learning-model-mapper';
import { CreateMachineLearningModelUseCase } from './create-machine-learning-model-use-case';

const schema = z.object({
  name: z.string(),
  description: z.string(),
  metadata: z.object({ path: z.string() }).transform(v => v.path),
  model: z.object({ path: z.string() }).transform(v => v.path),
  weights: z.object({ path: z.string() }).transform(v => v.path),
});

export type MachineLearningModelFileNames = 'metadata' | 'model' | 'weights';

export class CreateMachineLearningModelController implements IController {
  constructor(
    private readonly useCase: CreateMachineLearningModelUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {

    const files = request?.files as MixedFiles<MachineLearningModelFileNames>;
    const metadata = files?.metadata?.[0];
    const model = files?.model?.[0];
    const weights = files?.weights?.[0];


    const parsedBody = schema.parse({
      ...request.body,
      metadata, model, weights
    });

    const { machinelearningmodel } = await this.useCase.execute(parsedBody);

    return new HttpResponse({
      body: {
        machinelearningmodel: MachineLearningModelMapper.toHttp(machinelearningmodel),
      }
    }).created();
  }
}
