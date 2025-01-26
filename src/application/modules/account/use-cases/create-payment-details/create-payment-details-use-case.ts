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
