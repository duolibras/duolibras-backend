import { Entity, IEntityProps } from '@/application/shared/entities/entity';

export interface RoleProps extends IEntityProps {
  code: string;
}

export class Role extends Entity {
  readonly props: RoleProps;

  constructor(props: RoleProps) {
    super(props);
    this.props = props;
  }

  public get code(): string {
    return this.props.code;
  }
}
