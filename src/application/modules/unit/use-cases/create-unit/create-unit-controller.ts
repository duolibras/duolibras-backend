import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { UnitMapper } from '../../mappers/unit-mapper';
import { CreateUnitUseCase } from './create-unit-use-case';

const schema = z.object({
  name: z.string(),
});

export class CreateUnitController implements IController {
  constructor(
    private readonly useCase: CreateUnitUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { name } = schema.parse(request.body);

    const { unit } = await this.useCase.execute({ name });

    return new HttpResponse({
      body: {
        unit: UnitMapper.toHttp(unit),
      }
    }).created();
  }
}
