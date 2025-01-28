import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { CheckoutProvider } from '@/application/shared/providers/checkout-provider/checkout-provider';
import { AccountRepository } from '../../repositories/account-repository';

interface IInput {
  accountId: string;
  returnUrl: string;
}

interface IOutput {
  updatePaymentDetailsUrl: string;
}

export class UpdatePaymentDetailsUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly checkoutProvider: CheckoutProvider,
  ) {}

  async execute(input: IInput): Promise<IOutput> {
    const { accountId, returnUrl } = input;

    const paymentDetailsFound = await this.accountRepository.getAccountPaymentDetails(accountId);

    if (!paymentDetailsFound) {
      throw new NotFoundHTTPError('Essa conta já ainda não tem detalhes de pagamento criada, utilize a rota de create para gerar um link de onboarding');
    }

    const updatePaymentDetailsUrl = await this.checkoutProvider.generateOnboardingUrl(
      paymentDetailsFound.stripeAccountId,
      returnUrl,
    );

    return {
      updatePaymentDetailsUrl: updatePaymentDetailsUrl
    };
  }
}
