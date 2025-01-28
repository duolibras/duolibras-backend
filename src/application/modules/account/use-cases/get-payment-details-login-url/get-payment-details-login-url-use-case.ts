import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { CheckoutProvider } from '@/application/shared/providers/checkout-provider/checkout-provider';
import { AccountPaymentDetailsStatus } from '../../entities/account-payment-details';
import { AccountRepository } from '../../repositories/account-repository';

interface IInput {
  accountId: string;
}

interface IOutput {
  loginUrl: string;
}

export class GetPaymentDetailsLoginUrlUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly accountRepo: AccountRepository,
    private readonly checkoutProvider: CheckoutProvider,
  ) {}

  async execute({ accountId }: IInput): Promise<IOutput> {
    const paymentDetails = await this.accountRepo.getAccountPaymentDetails(accountId);

    if (!paymentDetails) {
      throw new NotFoundHTTPError('Essa conta ainda não tem detalhes de pagamento, por favor cadastre para poder verificar a dashboard');
    }

    if (paymentDetails.status !== AccountPaymentDetailsStatus.COMPLETED) {
      throw new NotFoundHTTPError('Essa conta ainda completou os detalhes de pagamento, por favor atualize para poder verificar a dashboard');
    }

    const loginUrl = await this.checkoutProvider.generateLoginUrl(paymentDetails.stripeAccountId);

    return {
      loginUrl
    };
  }
}
