import { Entity, IEntityProps } from '@/application/shared/entities/entity';

export interface UnitProps extends IEntityProps {
  name: string;
  chaptersCount: number;
}

export class Unit extends Entity {
  readonly props: UnitProps;

  constructor(props: UnitProps) {
    super(props);
    this.props = props;
  }

  public get name(): string {
    return this.props.name;
  }

  public get chaptersCount(): number {
    return this.props.chaptersCount;
  }
}
