import { ConflictHTTPError } from '@/application/shared/http/errors/conflict-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { CheckoutProvider } from '@/application/shared/providers/checkout-provider/checkout-provider';
import { AccountPaymentDetails } from '../../entities/account-payment-details';
import { AccountRepository } from '../../repositories/account-repository';

interface IInput {
  accountId: string;
  returnUrl: string;
}

interface IOutput {
  accountPaymentDetails: AccountPaymentDetails;
}

export class CreatePaymentDetailsUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly checkoutProvider: CheckoutProvider,
  ) {}

  async execute(input: IInput): Promise<IOutput> {
    const { accountId, returnUrl } = input;

    const paymentDetailsFound = await this.accountRepository.getAccountPaymentDetails(accountId);

    if (paymentDetailsFound) {
      throw new ConflictHTTPError('Essa conta já tem detalhes de pagamento criada, utilize a rota de update para gerar um link de atualização de dados');
    }

    const { paymentDetails } = await this.checkoutProvider.setupAccountPaymentDetails(
      accountId,
      returnUrl
    );

    await this.accountRepository.createAccountPaymentDetails(paymentDetails);

    return {
      accountPaymentDetails: paymentDetails
    };
  }
}
