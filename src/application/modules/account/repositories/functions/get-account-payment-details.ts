import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { AccountPaymentDetailsMapper } from '../../mappers/account-payment-details-mapper';

export async function prismaGetAccountPaymentDetails(accountId: string) {
  const paymentDetails = await prismaClient.accountPaymentDetails.findUnique({
    where: { accountId }
  });

  return paymentDetails ? AccountPaymentDetailsMapper.toDomain(paymentDetails) : null;
}
