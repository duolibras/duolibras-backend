import { Prisma, Unit as RawUnit } from '@prisma/client';
import { UserJourneyStatus } from '../../journey/entities/journey';
import { Unit } from '../entities/unit';

export class UnitMapper {
  static toPersistence(unit: Unit, students: { id: string, status: UserJourneyStatus }[]): Prisma.UnitCreateInput {
    return {
      id: unit.id,
      chaptersCount: unit.chaptersCount,
      name: unit.name,
      createdAt: unit.createdAt,
      updatedAt: unit.updatedAt,
      usersJourneysStatus: {
        createMany: {
          data: students.map(({ id, status }) => ({
            accountId: id,
            status,
          })),
        }
      }
    };
  }

  static toDomain(data: RawUnit): Unit {
    return new Unit({
      id: data.id,
      name: data.name,
      chaptersCount: data.chaptersCount,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  static toHttp(data: Unit) {
    return {
      id: data.id,
      name: data.name,
      chaptersCount: data.chaptersCount,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toSummaryHttp(data: Unit) {
    return {
      id: data.id,
      name: data.name,
      chaptersCount: data.chaptersCount,
    };
  }
}
