import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { UpdatePaymentDetailsUseCase } from './update-payment-details-use-case';

const schema = z.object({
  accountId: z.string().ulid(),
  returnUrl: z.string().url(),
});

export class UpdatePaymentDetailsController implements IController {
  constructor(
    private readonly useCase: UpdatePaymentDetailsUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const parsedBody = schema.parse({
      accountId: request.account?.id,
      ...request.body,
    });

    const { updatePaymentDetailsUrl } = await this.useCase.execute(parsedBody);

    return new HttpResponse({
      body: {
        updatePaymentDetailsUrl,
      }
    }).ok();
  }


}
