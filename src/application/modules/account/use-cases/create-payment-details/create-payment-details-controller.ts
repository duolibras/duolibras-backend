import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { AccountPaymentDetailsMapper } from '../../mappers/account-payment-details-mapper';
import { CreatePaymentDetailsUseCase } from './create-payment-details-use-case';

const schema = z.object({
  accountId: z.string().ulid(),
  returnUrl: z.string().url(),
});

export class CreatePaymentDetailsController implements IController {
  constructor(
    private readonly useCase: CreatePaymentDetailsUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const parsedBody = schema.parse({
      accountId: request.account?.id,
      ...request.body,
    });

    const { accountPaymentDetails } = await this.useCase.execute(parsedBody);

    return new HttpResponse({
      body: {
        accountPaymentDetails: AccountPaymentDetailsMapper.toHttp(accountPaymentDetails)
      }
    }).created();
  }


}
