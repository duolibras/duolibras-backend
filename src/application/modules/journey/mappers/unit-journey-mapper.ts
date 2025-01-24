import { Unit as RawUnit, UserJourneyStatus as RawUserJourneyStatus } from '@prisma/client';
import { UnitMapper } from '../../unit/mappers/unit-mapper';
import { UserJourneyStatus } from '../entities/journey';
import { UnitJourney } from '../entities/unit-journey';
import { ChapterJourneyMapper, RawChapterJourney } from './chapter-journey-mapper';

export interface RawUnitJourney extends RawUnit {
  usersJourneysStatus: {
    status: RawUserJourneyStatus;
    chaptersCompletedCount: number;
  }[];
  chapters: RawChapterJourney[]
}

export class UnitJourneyMapper {
  static toDomain(data: RawUnitJourney): UnitJourney {
    const unitJourney = data.usersJourneysStatus?.[0] ?? {};

    return new UnitJourney({
      ...UnitMapper.toDomain(data).props,
      chaptersAccomplished: unitJourney.chaptersCompletedCount ?? 0,
      status: unitJourney.status as UserJourneyStatus,
      chapters: data.chapters.map(ChapterJourneyMapper.toDomain)
    });
  }

  static toHttp(unitJourney: UnitJourney) {
    return {
      ...UnitMapper.toSummaryHttp(unitJourney),
      chaptersAccomplished: unitJourney.chaptersAccomplished,
      status: unitJourney.status,
      chapters: unitJourney.chapters.map(ChapterJourneyMapper.toHttp)
    };
  }
}
