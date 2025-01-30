import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { Prisma, AccountPaymentDetails as RawAccountPaymentDetails } from '@prisma/client';
import { AccountPaymentDetails, AccountPaymentDetailsStatus } from '../entities/account-payment-details';

export class AccountPaymentDetailsMapper {
  static toPersistence(domain: AccountPaymentDetails): Prisma.AccountPaymentDetailsCreateInput {
    if (!domain.stripeAccountId) {
      throw new InternalServerHTTPError('A stripe account não foi criada!');
    }

    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      stripeAccountId: domain.stripeAccountId,
      account: {
        connect: {
          id: domain.accountId,
        }
      }
    };
  }

  static toDomain(data: RawAccountPaymentDetails): AccountPaymentDetails {
    return new AccountPaymentDetails({
      id: data.id,
      accountId: data.accountId,
      stripeAccountId: data.stripeAccountId,
      status: data.status as AccountPaymentDetailsStatus,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  static toHttp(data: AccountPaymentDetails) {
    return {
      id: data.id,
      accountId: data.accountId,
      stripeAccountId: data.stripeAccountId,
      status: data.status,
      onboardingUrl: data.onboardingUrl,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
