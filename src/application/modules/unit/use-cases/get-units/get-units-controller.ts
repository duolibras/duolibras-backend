import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { UnitMapper } from '../../mappers/unit-mapper';
import { GetUnitsUseCase } from './get-units-use-case';

export class GetUnitsController implements IController {
  constructor(
    private readonly useCase: GetUnitsUseCase,
  ) {}

  async handle(_request: IHttpRequest): Promise<IHttpResponse> {
    const { units } = await this.useCase.execute();

    return new HttpResponse({
      body: {
        units: units.map(UnitMapper.toSummaryHttp),
      }
    }).ok();
  }
}
