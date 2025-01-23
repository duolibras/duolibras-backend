import { Unit, UnitProps } from '../../unit/entities/unit';
import { ChapterJourney } from './chapter-journey';
import { UserJourneyStatus } from './journey';

interface UnitJourneyProps extends UnitProps {
  chapters: ChapterJourney[];
  status?: UserJourneyStatus | null;
}

export class UnitJourney extends Unit {
  readonly props: UnitJourneyProps;

  constructor(props: UnitJourneyProps) {
    super(props);
    this.props = props;
  }

  public get chapters(): ChapterJourney[] {
    return this.props.chapters;
  }

  public get status(): UserJourneyStatus | null {
    return this.props.status ?? null;
  }

  public set status(status: UserJourneyStatus) {
    this.props.status = status;
  }
}
