import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { JourneyMapper } from '../../mappers/jorney-mapper';
import { GetMyJourneyUseCase } from './get-my-journey-use-case';

const schema = z.object({
  accountId: z.string().ulid(),
});

export class GetMyJourneyController implements IController {
  constructor(
    private readonly useCase: GetMyJourneyUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { account } = request;

    const { accountId } = schema.parse({ accountId: account?.id });

    const { journey } = await this.useCase.execute({ accountId });

    return new HttpResponse({
      body: {
        journey: JourneyMapper.toHttp(journey)
      }
    }).ok();
  }
}
