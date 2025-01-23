import { Journey } from '../entities/journey';
import { RawUnitJourney, UnitJourneyMapper } from './unit-journey-mapper';

export class JourneyMapper {
  static toDomain(data: RawUnitJourney[]): Journey {
    return new Journey({
      units: data.map(UnitJourneyMapper.toDomain)
    });
  }

  static toHttp(data: Journey) {
    return {
      units: data.units.map(UnitJourneyMapper.toHttp)
    };
  }
}
