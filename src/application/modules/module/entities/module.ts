import { Entity, IEntityProps } from '@/application/shared/entities/entity';

export enum ModuleType {
  CONTENT = 'CONTENT',
  QUESTION = 'QUESTION',
}

export interface ModuleProps extends IEntityProps {
  type: ModuleType[keyof ModuleType];
  lessonId: string;
  contentId?: string | null;
  questionId?: string | null;
}

export class Module extends Entity {
  readonly props: ModuleProps;

  constructor(props: ModuleProps) {
    super(props);
    this.props = props;
  }

  public get type(): ModuleType[keyof ModuleType] {
    return this.props.type;
  }

  public get lessonId(): string {
    return this.props.lessonId;
  }

  public get contentId(): string | null {
    return this.props.contentId ?? null;
  }

  public get questionId(): string | null {
    return this.props.questionId ?? null;
  }
}
