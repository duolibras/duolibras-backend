import { Entity, IEntityProps } from '@/application/shared/entities/entity';

export interface ChapterProps extends IEntityProps {
  name: string;
  description: string;
  lessonsCount: number;
  unitId: string;
}

export class Chapter extends Entity {
  readonly props: ChapterProps;

  constructor(props: ChapterProps) {
    super(props);
    this.props = props;
  }

  public get name(): string {
    return this.props.name;
  }

  public get description(): string {
    return this.props.description;
  }

  public get lessonsCount(): number {
    return this.props.lessonsCount;
  }

  public get unitId(): string {
    return this.props.unitId;
  }
}
