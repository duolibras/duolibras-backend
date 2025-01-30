import { Entity, IEntityProps } from '@/application/shared/entities/entity';
import { AccountPaymentDetailsStatus } from './account-payment-details';

export enum Roles {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

export interface AccountProps extends IEntityProps {
  name: string;
  email: string;
  password: string;
  roleCode: Roles;
  hasPaymentDetails: boolean;
  paymentDetailsStatus?: AccountPaymentDetailsStatus | null;
}

export class Account extends Entity {
  readonly props: AccountProps;

  constructor(props: AccountProps) {
    super(props);
    this.props = props;
  }

  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }

  public get password(): string {
    return this.props.password;
  }

  public get roleCode(): Roles {
    return this.props.roleCode;
  }

  public get hasPaymentDetails(): boolean {
    return this.props.hasPaymentDetails;
  }

  public get paymentDetailsStatus(): AccountPaymentDetailsStatus | null {
    return this.props.paymentDetailsStatus ?? null;
  }
}
