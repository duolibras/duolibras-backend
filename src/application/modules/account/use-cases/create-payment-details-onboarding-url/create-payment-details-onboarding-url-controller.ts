import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { CreatePaymentDetailsOnboardingUrlUseCase } from './create-payment-details-onboarding-url-use-case';

const schema = z.object({
  token: z.string().jwt(),
  returnUrl: z.string().url(),
});

export class CreatePaymentDetailsOnboardingUrlController implements IController {
  constructor(
    private readonly useCase: CreatePaymentDetailsOnboardingUrlUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const parsedBody = schema.parse(request.query);

    const { onboardingUrl } = await this.useCase.execute(parsedBody);

    return new HttpResponse({
      body: {
        onboardingUrl,
      }
    }).ok();
  }
}
