import { UnitJourney } from './unit-journey';

export enum UserJourneyStatus {
  UNAVAILABLE = 'UNAVAILABLE',
  AVAILABLE = 'AVAILABLE',
  ACCOMPLISHED = 'ACCOMPLISHED'
}

interface JourneyProps {
  units: UnitJourney[];
}

export class Journey {
  readonly props: JourneyProps;

  constructor(props: JourneyProps) {
    this.props = props;
    this.generateStatuses();
  }

  public get units(): UnitJourney[] {
    return this.props.units;
  }

  private getStatus(index: number, lastStatus?: UserJourneyStatus | null): UserJourneyStatus {
    return (lastStatus === UserJourneyStatus.ACCOMPLISHED || index === 0)
      ? UserJourneyStatus.AVAILABLE
      : UserJourneyStatus.UNAVAILABLE;
  }

  private generateStatuses() {
    this.units.forEach((unit, unitIndex) => {
      unit.status = unit.status
        ?? this.getStatus(unitIndex, this.units[Math.max(0, unitIndex - 1)].status);

      unit.chapters.forEach((chapter, chapterIndex) => {
        const unitUnavailable = unit.status === UserJourneyStatus.UNAVAILABLE;
        chapter.status = unitUnavailable
          ? UserJourneyStatus.UNAVAILABLE
          : chapter.status ??
            this.getStatus(chapterIndex, unit.chapters[Math.max(0, chapterIndex - 1)].status);

        chapter.lessons.forEach((lesson, lessonIndex) => {
          const chapterUnavailable = chapter.status === UserJourneyStatus.UNAVAILABLE;
          lesson.status = chapterUnavailable
            ? UserJourneyStatus.UNAVAILABLE
            : lesson.status ??
              this.getStatus(lessonIndex, chapter.lessons[Math.max(0, lessonIndex - 1)].status);
        });
      });
    });
  }
}
