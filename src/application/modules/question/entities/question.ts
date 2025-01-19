import { Entity, IEntityProps } from '@/application/shared/entities/entity';
import { Answer } from '../../answer/entities/answer';
import { Module, ModuleType } from '../../module/entities/module';

export enum QuestionType {
  VIDEO = 'VIDEO',
  SINGLE_CHOICE = 'SINGLE_CHOICE',
}

export interface QuestionProps extends IEntityProps {
  name: string;
  description: string;
  videoUrl?: string | null;
  lessonId: string;
  module?: Module | null;
  type: QuestionType;
  answers?: Answer[];
  machineLearningModelId?: string | null;
}

export class Question extends Entity {
  readonly props: QuestionProps;

  constructor(props: QuestionProps) {
    super(props);
    this.props = props;
    this.props.module = props.module ?? new Module({
      type: ModuleType.QUESTION,
      lessonId: props.lessonId,
      questionId: props.id,
    }) ;
  }

  public get name(): string {
    return this.props.name;
  }

  public get description(): string {
    return this.props.description;
  }

  public get videoUrl(): string | null {
    return this.props.videoUrl ?? null;
  }

  public get lessonId(): string {
    return this.props.lessonId;
  }

  public get module(): Module {
    return this.props.module!;
  }

  public get type(): QuestionType {
    return this.props.type;
  }

  public set answers(answers: Answer[]) {
    this.props.answers = answers;
  }

  public get answers(): Answer[] {
    return this.props.answers ?? [];
  }

  public get machineLearningModelId(): string | null {
    return this.props.machineLearningModelId ?? null;
  }
}
