import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { CheckoutProvider } from '@/application/shared/providers/checkout-provider/checkout-provider';

interface IInput {
  stripeAccountId: string;
  returnUrl: string;
}

interface IOutput {
  onboardingUrl: string;
}

export class CreatePaymentDetailsOnboardingUrlUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly checkoutProvider: CheckoutProvider,
  ) {}

  async execute({ stripeAccountId, returnUrl }: IInput): Promise<IOutput> {
    const onboardingUrl = await this.checkoutProvider.generateOnboardingUrl(stripeAccountId, returnUrl);

    return {
      onboardingUrl,
    };
  }
}
