import { AccountPaymentDetails, AccountPaymentDetailsStatus } from '../entities/account-payment-details';

export interface AccountRepository {
  getAccountPaymentDetails(accountId: string): Promise<AccountPaymentDetails | null>;
  createAccountPaymentDetails(account: AccountPaymentDetails): Promise<void>;
  changeAccountPaymentDetailsStatus(stripeAccountId: string, status: AccountPaymentDetailsStatus): Promise<void>
}
