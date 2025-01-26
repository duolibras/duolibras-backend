import { Entity, IEntityProps } from '@/application/shared/entities/entity';

export enum AccountPaymentDetailsStatus {
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export interface IAccountPaymentDetailsProps extends IEntityProps {
  accountId: string;
  stripeAccountId: string;
  status?: AccountPaymentDetailsStatus | null;
  onboardingUrl?: string | null;
}

export class AccountPaymentDetails extends Entity {
  readonly props: IAccountPaymentDetailsProps;

  constructor(props: IAccountPaymentDetailsProps) {
    super(props);
    this.props = props;
  }

  public get stripeAccountId(): string {
    return this.props.stripeAccountId;
  }

  public get onboardingUrl(): string | null {
    return this.props.onboardingUrl ?? null;
  }

  public set onboardingUrl(onboardingUrl: string) {
    this.props.onboardingUrl = onboardingUrl;
  }

  public get accountId(): string {
    return this.props.accountId;
  }

  public get status(): AccountPaymentDetailsStatus {
    return this.props.status ?? AccountPaymentDetailsStatus.PENDING;
  }
}
