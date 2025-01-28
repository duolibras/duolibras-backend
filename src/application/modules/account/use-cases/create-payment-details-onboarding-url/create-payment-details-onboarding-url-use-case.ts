import { UnauthorizedHTTPError } from '@/application/shared/http/errors/unauthorized-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { CheckoutProvider } from '@/application/shared/providers/checkout-provider/checkout-provider';
import { TokenProvider } from '@/application/shared/providers/token-provider/token-provider';

interface IInput {
  token: string;
  returnUrl: string;
}

interface IOutput {
  onboardingUrl: string;
}

export class CreatePaymentDetailsOnboardingUrlUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly tokenProvider: TokenProvider,
    private readonly checkoutProvider: CheckoutProvider,
  ) {}

  async execute({ token, returnUrl }: IInput): Promise<IOutput> {
    let stripeAccountId: string;

    try {
      const { sub } = this.tokenProvider.verifyStripeToken(token);

      if (!sub) throw new Error();

      stripeAccountId = sub;
    } catch {
      throw new UnauthorizedHTTPError('Token inválido ou expirado, volte para a plataforma para gerar um novo link de onboarding!');
    }


    const onboardingUrl = await this.checkoutProvider.generateOnboardingUrl(
      stripeAccountId,
      returnUrl,
      token,
    );

    return {
      onboardingUrl,
    };
  }
}
