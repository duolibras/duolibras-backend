import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { JourneyMapper } from '../../mappers/jorney-mapper';
import { GetMyJourneyUseCase } from './get-my-journey-use-case';

export class GetPublicJourneyController implements IController {
  constructor(
    private readonly useCase: GetMyJourneyUseCase,
  ) {}

  async handle(_request: IHttpRequest): Promise<IHttpResponse> {
    const { journey } = await this.useCase.execute({ });

    return new HttpResponse({
      body: {
        journey: JourneyMapper.toHttp(journey)
      }
    }).ok();
  }
}
