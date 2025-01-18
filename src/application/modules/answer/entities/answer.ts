import { Entity, IEntityProps } from '@/application/shared/entities/entity';

export interface AnswerProps extends IEntityProps {
  description?: string | null;
  videoUrl?: string | null;
  questionId: string;
  isCorrect: boolean;
}

export class Answer extends Entity {
  readonly props: AnswerProps;

  constructor(props: AnswerProps) {
    super(props);
    this.props = props;
  }

  public get description(): string | null {
    return this.props.description ?? null;
  }

  public get videoUrl(): string | null {
    return this.props.videoUrl ?? null;
  }

  public get questionId(): string {
    return this.props.questionId;
  }

  public get isCorrect(): boolean {
    return this.props.isCorrect;
  }
}
