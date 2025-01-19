import { Entity, IEntityProps } from '@/application/shared/entities/entity';
import { Module, ModuleType } from '../../module/entities/module';

export interface ContentProps extends IEntityProps {
  name: string;
  description: string;
  videoKey: string;
  lessonId: string;
  module?: Module | null;
}

export class Content extends Entity {
  readonly props: ContentProps;

  constructor(props: ContentProps) {
    super(props);
    this.props = props;
    this.props.module = props.module ?? new Module({
      type: ModuleType.CONTENT,
      lessonId: props.lessonId,
      contentId: props.id,
    }) ;
  }

  public get name(): string {
    return this.props.name;
  }

  public get description(): string {
    return this.props.description;
  }

  public get videoKey(): string {
    return this.props.videoKey;
  }

  public get lessonId(): string {
    return this.props.lessonId;
  }

  public get module(): Module {
    return this.props.module!;
  }
}
