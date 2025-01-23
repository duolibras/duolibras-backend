import { Lesson, LessonProps } from '../../lesson/entities/lesson';
import { UserJourneyStatus } from './journey';

interface LessonJourneyProps extends LessonProps {
  status?: UserJourneyStatus | null;
}

export class LessonJourney extends Lesson {
  readonly props: LessonJourneyProps;

  constructor(props: LessonJourneyProps) {
    super(props);
    this.props = props;
  }

  public get status(): UserJourneyStatus | null {
    return this.props.status ?? null;
  }

  public set status(status: UserJourneyStatus) {
    this.props.status = status;
  }
}
