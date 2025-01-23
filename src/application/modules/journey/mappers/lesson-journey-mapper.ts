import { Lesson as RawLesson, UserJourneyStatus as RawUserJourneyStatus } from '@prisma/client';
import { LessonMapper } from '../../lesson/mappers/lesson-mapper';
import { UserJourneyStatus } from '../entities/journey';
import { LessonJourney } from '../entities/lesson-journey';

export interface RawLessonJourney extends RawLesson {
  lessonsUserJourneyStatus: {
    status: RawUserJourneyStatus
  }[];
}

export class LessonJourneyMapper {
  static toDomain(data: RawLessonJourney): LessonJourney {
    return new LessonJourney({
      ...LessonMapper.toDomain(data).props,
      status: data.lessonsUserJourneyStatus?.[0]?.status as UserJourneyStatus,
    });
  }

  static toHttp(lessonJourney: LessonJourney) {
    return {
      ...LessonMapper.toSummaryHttp(lessonJourney),
      status: lessonJourney.status,
    };
  }
}
