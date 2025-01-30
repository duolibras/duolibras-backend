import { Prisma, Account as RawAccount, AccountPaymentDetailsStatus as RawAccountPaymentDetailsStatus } from '@prisma/client';

import { Account, Roles } from '../entities/account';
import { AccountPaymentDetailsStatus } from '../entities/account-payment-details';


export type PersistenceAccount = RawAccount & {
  paymentDetails: {
    stripeAccountId: string;
    status: RawAccountPaymentDetailsStatus;
  } | null;
};

export class AccountMapper {
  static toPersistence(account: Account): Prisma.AccountCreateInput {
    return {
      id: account.id,
      email: account.email,
      name: account.name,
      password: account.password,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
      role: {
        connect: {
          code: account.roleCode
        }
      },
    };
  }

  static toDomain(data: PersistenceAccount) {
    return new Account({
      id: data.id,
      email: data.email,
      name: data.name,
      password: data.password,
      roleCode: data.roleCode as Roles,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      hasPaymentDetails: !!data.paymentDetails?.stripeAccountId,
      paymentDetailsStatus: data.paymentDetails?.status as AccountPaymentDetailsStatus
    });
  }

  static toHttp(account: Account) {
    return {
      id: account.id,
      name: account.name,
      email: account.email,
      role: account.roleCode,
      createdAt: account.createdAt,
      updateAt: account.updatedAt,
      paymentDetails: {
        hasPaymentDetails: account.hasPaymentDetails,
        status: account.paymentDetailsStatus,
      }
    };
  }
}
