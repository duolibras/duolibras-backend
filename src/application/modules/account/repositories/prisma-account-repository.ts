import { AccountPaymentDetails, AccountPaymentDetailsStatus } from '../entities/account-payment-details';
import { AccountRepository } from './account-repository';
import { prismaChangeAccountPaymentDetailsStatus } from './functions/change-account-payment-details-status';
import { prismaCreateAccountPaymentDetails } from './functions/create-account-payment-details';
import { prismaGetAccountPaymentDetails } from './functions/get-account-payment-details';
import { prismaGetAccountPaymentDetailsByStripeAccountId } from './functions/get-account-payment-details-by-stripe-account-id';

export class PrismaAccountRepository implements AccountRepository {
  async getAccountPaymentDetailsByStripeAccountId(
    stripeAccountId: string
  ): Promise<AccountPaymentDetails | null> {
    return prismaGetAccountPaymentDetailsByStripeAccountId(stripeAccountId);
  }

  async getAccountPaymentDetails(accountId: string): Promise<AccountPaymentDetails | null> {
    return prismaGetAccountPaymentDetails(accountId);
  }

  async createAccountPaymentDetails(paymentDetails: AccountPaymentDetails): Promise<void> {
    await prismaCreateAccountPaymentDetails(paymentDetails);
  }

  async changeAccountPaymentDetailsStatus(
    stripeAccountId: string, status: AccountPaymentDetailsStatus
  ): Promise<void> {
    await prismaChangeAccountPaymentDetailsStatus(stripeAccountId, status);
  }
}
