import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { AccountPaymentDetailsMapper } from '../../mappers/account-payment-details-mapper';

export async function prismaGetAccountPaymentDetailsByStripeAccountId(stripeAccountId: string) {
  const paymentDetails = await prismaClient.accountPaymentDetails.findUnique({
    where: { stripeAccountId }
  });

  return paymentDetails ? AccountPaymentDetailsMapper.toDomain(paymentDetails) : null;
}
