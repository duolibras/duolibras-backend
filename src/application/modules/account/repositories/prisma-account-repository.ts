import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { AccountPaymentDetails, AccountPaymentDetailsStatus } from '../entities/account-payment-details';
import { AccountRepository } from './account-repository';
import { prismaCreateAccountPaymentDetails } from './functions/create-account-payment-details';
import { prismaGetAccountPaymentDetails } from './functions/get-account-payment-details';

export class PrismaAccountRepository implements AccountRepository {
  async getAccountPaymentDetails(accountId: string): Promise<AccountPaymentDetails | null> {
    return prismaGetAccountPaymentDetails(accountId);
  }

  async createAccountPaymentDetails(paymentDetails: AccountPaymentDetails): Promise<void> {
    await prismaCreateAccountPaymentDetails(paymentDetails);
  }

  async changeAccountPaymentDetailsStatus(stripeAccountId: string, status: AccountPaymentDetailsStatus): Promise<void> {
    await prismaClient.accountPaymentDetails.update({
      where: {
        stripeAccountId,
      },
      data: {
        status
      }
    });
  }
}
