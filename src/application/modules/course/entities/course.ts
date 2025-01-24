import { Entity, IEntityProps } from '@/application/shared/entities/entity';

export interface CourseProps extends IEntityProps {
  name: string;
  description: string;
  value?: number;
  preemium: boolean;
  classCount: number;
  teacherId: string;
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

  public get value(): number | undefined {
    return this.props.value;
  }

  public get preemium(): boolean {
    return this.props.preemium;
  }

  public get classCount(): number {
    return this.props.classCount;
  }

  public get teacherId(): string {
    return this.props.teacherId;
  }
}
