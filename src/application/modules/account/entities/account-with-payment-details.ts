import { Account, AccountProps } from './account';
import { AccountPaymentDetails } from './account-payment-details';

interface IAccountWithPaymentDetailsProps extends AccountProps {
  paymentDetails: AccountPaymentDetails
}

export class AccountWithPaymentDetails extends Account {
  readonly props: IAccountWithPaymentDetailsProps;

  constructor(props: IAccountWithPaymentDetailsProps) {
    super(props);
    this.props = props;
  }

  public get paymentDetails(): AccountPaymentDetails {
    return this.props.paymentDetails;
  }
}
