import { Roles } from '@/application/modules/auth/entities/account';
import { UserJourneyStatus } from '@/application/modules/journey/entities/journey';
import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Unit } from '../../../entities/unit';
import { UnitMapper } from '../../../mappers/unit-mapper';

export async function prismaCreateUnit(unit: Unit) {
  const students = await prismaClient.account.findMany({
    where: { roleCode: Roles.STUDENT },
    select: {
      id: true,
      UserJourney: {
        select: {
          unitsUserJourneyStatuses: {
            select: {
              status: true,
            }
          }
        }
      }
    }
  });

  const studentsStatus = students.map((student) => {
    const allStatusAccomplished = student.UserJourney?.unitsUserJourneyStatuses?.every(
      (statusRecord) => statusRecord?.status === UserJourneyStatus.ACCOMPLISHED
    ) ?? false;

    return {
      id: student.id,
      status: allStatusAccomplished ? UserJourneyStatus.AVAILABLE : UserJourneyStatus.UNAVAILABLE
    };
  });

  await prismaClient.unit.create({
    data: UnitMapper.toPersistence(unit, studentsStatus),
  });
}
