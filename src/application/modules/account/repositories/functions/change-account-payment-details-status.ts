import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { AccountPaymentDetailsStatus } from '../../entities/account-payment-details';

export async function prismaChangeAccountPaymentDetailsStatus(
  stripeAccountId: string, status: AccountPaymentDetailsStatus
) {
  await prismaClient.accountPaymentDetails.update({
    where: {
      stripeAccountId,
    },
    data: {
      status
    }
  });
}
