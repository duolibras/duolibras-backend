import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Journey, UserJourneyStatus } from '../entities/journey';
import { JourneyMapper } from '../mappers/jorney-mapper';
import { JourneyRepository } from './journey-repository';

export class PrismaJourneyRepository implements JourneyRepository {
  async completeLesson(lessonId: string, accountId: string): Promise<void> {
    await prismaClient.lessonUserJourneyStatus.upsert({
      where: {
        accountId_lessonId: {
          accountId,
          lessonId,
        }
      },
      update: {
        status: UserJourneyStatus.ACCOMPLISHED,
      },
      create: {
        lessonId,
        accountId,
        status: UserJourneyStatus.ACCOMPLISHED,
      },
    });

    await this.completeChapter(lessonId, accountId);
  }

  async getMyJourney(accountId: string): Promise<Journey> {
    const units = await prismaClient.unit.findMany({
      orderBy: { id: 'asc' },
      include: {
        usersJourneysStatus: {
          where: { accountId },
          select: { status: true },
          take: 1,
        },
        chapters: {
          orderBy: { id: 'asc' },
          include: {
            chaptersUserJourneyStatus: {
              where: { accountId },
              select: { status: true },
              take: 1,
            },
            lessons: {
              orderBy: { id: 'asc' },
              include: {
                lessonsUserJourneyStatus: {
                  where: { accountId },
                  select: { status: true },
                  take: 1,
                }
              }
            }
          }
        },
      }
    });

    return JourneyMapper.toDomain(units);
  }

  private async completeUnit(chapterId: string, accountId: string) {
    const chapter = await prismaClient.chapter.findUnique({
      where: { id: chapterId },
      select: {
        unit: {
          select: {
            id: true,
            chaptersCount: true,
            usersJourneysStatus: {
              where: {
                accountId,
              },
              select: {
                chaptersCompletedCount: true,
              }
            }
          }
        }
      }
    });

    const unitId = chapter!.unit.id;
    const chaptersCompletedCount = chapter?.unit?.usersJourneysStatus?.[0]?.chaptersCompletedCount ?? 0;
    const chaptersCount = chapter!.unit.chaptersCount;

    if (chaptersCount === chaptersCompletedCount + 1) {
      await prismaClient.unitUserJourneyStatus.upsert({
        where: {
          accountId_unitId: {
            accountId,
            unitId,
          },
        },
        create: {
          accountId,
          unitId,
          status: UserJourneyStatus.ACCOMPLISHED,
          chaptersCompletedCount: chaptersCompletedCount + 1,
        },
        update: {
          status: UserJourneyStatus.ACCOMPLISHED,
          chaptersCompletedCount: chaptersCompletedCount + 1,
        }
      });
    } else {
      await prismaClient.unitUserJourneyStatus.upsert({
        where: {
          accountId_unitId: {
            unitId,
            accountId,
          }
        },
        create: {
          accountId,
          unitId,
          status: UserJourneyStatus.AVAILABLE,
          chaptersCompletedCount: chaptersCompletedCount + 1
        },
        update: {
          chaptersCompletedCount: chaptersCompletedCount + 1
        }
      });
    }
  }

  private async completeChapter(lessonId: string, accountId: string) {
    const lesson = await prismaClient.lesson.findUnique({
      where: { id: lessonId },
      select: {
        chapter: {
          select: {
            id: true,
            lessonsCount: true,
            chaptersUserJourneyStatus: {
              where: {
                accountId,
              },
              select: {
                lessonsCompletedCount: true,
              }
            }
          }
        }
      }
    });

    const chapterId = lesson!.chapter.id;
    const lessonsCompletedCount = lesson?.chapter?.chaptersUserJourneyStatus?.[0]?.lessonsCompletedCount ?? 0;
    const lessonsCount = lesson!.chapter.lessonsCount;

    if (lessonsCount === lessonsCompletedCount + 1) {
      await prismaClient.chapterUserJourneyStatus.upsert({
        where: {
          accountId_chapterId: {
            accountId,
            chapterId,
          },
        },
        create: {
          accountId,
          chapterId,
          status: UserJourneyStatus.ACCOMPLISHED,
          lessonsCompletedCount: lessonsCompletedCount + 1,
        },
        update: {
          status: UserJourneyStatus.ACCOMPLISHED,
          lessonsCompletedCount: lessonsCompletedCount + 1,
        }
      });

      await this.completeUnit(chapterId, accountId);
    } else {
      await prismaClient.chapterUserJourneyStatus.upsert({
        where: {
          accountId_chapterId: {
            chapterId,
            accountId,
          }
        },
        create: {
          accountId,
          chapterId,
          status: UserJourneyStatus.AVAILABLE,
          lessonsCompletedCount: lessonsCompletedCount + 1
        },
        update: {
          lessonsCompletedCount: lessonsCompletedCount + 1
        }
      });
    }
  }
}
