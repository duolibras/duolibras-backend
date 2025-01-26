import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { AccountPaymentDetails } from '../../entities/account-payment-details';
import { AccountPaymentDetailsMapper } from '../../mappers/account-payment-details-mapper';

export async function prismaCreateAccountPaymentDetails(account: AccountPaymentDetails): Promise<void> {
  await prismaClient.accountPaymentDetails.create({
    data: AccountPaymentDetailsMapper.toPersistence(account)
  });
}
