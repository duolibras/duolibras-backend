import { Chapter as RawChapter, UserJourneyStatus as RawUserJourneyStatus } from '@prisma/client';
import { ChapterMapper } from '../../chapter/mappers/chapter-mapper';
import { ChapterJourney } from '../entities/chapter-journey';
import { UserJourneyStatus } from '../entities/journey';
import { LessonJourneyMapper, RawLessonJourney } from './lesson-journey-mapper';

export interface RawChapterJourney extends RawChapter {
  chaptersUserJourneyStatus: {
    status: RawUserJourneyStatus;
    lessonsCompletedCount: number;
  }[];
  lessons: RawLessonJourney[]
}

export class ChapterJourneyMapper {
  static toDomain(data: RawChapterJourney): ChapterJourney {
    const chapterJourney = data.chaptersUserJourneyStatus?.[0] ?? {};

    return new ChapterJourney({
      ...ChapterMapper.toDomain(data).props,
      lessonsAccomplished: chapterJourney.lessonsCompletedCount ?? 0,
      status: chapterJourney.status as UserJourneyStatus ,
      lessons: data.lessons.map(LessonJourneyMapper.toDomain),
    });
  }

  static toHttp(chapterJourney: ChapterJourney) {
    return {
      ...ChapterMapper.toSummaryHttp(chapterJourney),
      lessonsAccomplished: chapterJourney.lessonsAccomplished,
      status: chapterJourney.status,
      lessons: chapterJourney.lessons.map(LessonJourneyMapper.toHttp)
    };
  }
}
