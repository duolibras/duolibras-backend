import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { GetPaymentDetailsLoginUrlUseCase } from './get-payment-details-login-url-use-case';

const schema = z.object({
  accountId: z.string().ulid(),
});

export class GetPaymentDetailsLoginUrlController implements IController {
  constructor(
    private readonly useCase: GetPaymentDetailsLoginUrlUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { accountId } = schema.parse({
      accountId: request.account?.id
    });

    const { loginUrl } = await this.useCase.execute({ accountId });

    return new HttpResponse({
      body: {
        loginUrl,
      }
    }).ok();
  }
}
