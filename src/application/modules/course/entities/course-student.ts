import { Entity, IEntityProps } from '@/application/shared/entities/entity';

export enum CourseStudentPaymentStatus {
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED'
}

export interface ICourseStudentProps extends IEntityProps {
  studentId: string;
  courseId: string;
  checkoutSessionId?: string | null;
  checkoutUrl?: string | null;
  feedbackRate?: number | null;
  paymentStatus: CourseStudentPaymentStatus;
}

export class CourseStudent extends Entity {
  readonly props: ICourseStudentProps;

  constructor(props: ICourseStudentProps) {
    super(props);
    this.props = props;
  }

  public get studentId(): string {
    return this.props.studentId;
  }

  public get courseId(): string {
    return this.props.courseId;
  }

  public get checkoutSessionId(): string | null {
    return this.props.checkoutSessionId ?? null;
  }

  public get feedbackRate(): number | null {
    return this.props.feedbackRate ?? null;
  }

  public get paymentStatus(): CourseStudentPaymentStatus {
    return this.props.paymentStatus;
  }

  public set paymentStatus(paymentStatus) {
    this.props.paymentStatus = paymentStatus;
  }

  public get checkoutUrl(): string | null {
    return this.props.checkoutUrl ?? null;
  }

  public set checkoutUrl(checkoutUrl) {
    this.props.checkoutUrl = checkoutUrl;
  }
}
