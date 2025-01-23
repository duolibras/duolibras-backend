
import { Chapter, ChapterProps } from '../../chapter/entities/chapter';
import { UserJourneyStatus } from './journey';
import { LessonJourney } from './lesson-journey';

interface ChapterJourneyProps extends ChapterProps {
  lessons: LessonJourney[];
  status?: UserJourneyStatus | null;
}

export class ChapterJourney extends Chapter {
  readonly props: ChapterJourneyProps;

  constructor(props: ChapterJourneyProps) {
    super(props);
    this.props = props;
  }

  public get lessons(): LessonJourney[] {
    return this.props.lessons;
  }

  public get status(): UserJourneyStatus | null {
    return this.props.status ?? null;
  }

  public set status(status: UserJourneyStatus) {
    this.props.status = status;
  }
}
