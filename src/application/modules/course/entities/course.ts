import { Entity, IEntityProps } from '@/application/shared/entities/entity';

export interface CourseProps extends IEntityProps {
  name: string;
  description: string;
  priceInCents?: number;
  preemium: boolean;
  classCount: number;
  studentsCount: number;
  archived: boolean;
  teacherId: string;
  stripeCourseId?: string | null;
}

export class Course extends Entity {
  readonly props: CourseProps;

  constructor(props: CourseProps) {
    super(props);
    this.props = props;
  }

  public get name(): string {
    return this.props.name;
  }

  public get description(): string {
    return this.props.description;
  }

  public get priceInCents(): number | undefined {
    return this.props.priceInCents;
  }

  public get preemium(): boolean {
    return this.props.preemium;
  }

  public get classCount(): number {
    return this.props.classCount;
  }

  public get studentsCount(): number {
    return this.props.studentsCount;
  }

  public get teacherId(): string {
    return this.props.teacherId;
  }

  public get archived(): boolean {
    return this.props.archived;
  }

  public get stripeCourseId(): string | null {
    return this.props.stripeCourseId ?? null;
  }

  public set stripeCourseId(stripeCourseId: string) {
    this.props.stripeCourseId = stripeCourseId;
  }
}
