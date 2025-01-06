import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { UnitMapper } from '../../mappers/unit-mapper';
import { UpdateUnitUseCase } from './update-unit-use-case';

const schema = z.object({
  unitId: z.string().ulid(),
  name: z.string().optional(),
});

export class UpdateUnitController implements IController {
  constructor(
    private readonly useCase: UpdateUnitUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { unitId, name } = schema.parse({ ...request.params, ...request.body });

    const { unit } = await this.useCase.execute({
      unitId,
      name,
    });

    return new HttpResponse({
      body: { unit: UnitMapper.toHttp(unit) }
    }).ok();
  }
}
