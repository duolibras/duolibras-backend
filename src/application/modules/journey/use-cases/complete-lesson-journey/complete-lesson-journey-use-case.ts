import { ForbiddenHTTPError } from '@/application/shared/http/errors/forbidden-http-error';
import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { UserJourneyStatus } from '../../entities/journey';
import { JourneyRepository } from '../../repositories/journey-repository';

interface IInput {
  accountId: string;
  lessonId: string;
}

type IOutput = void;

export class CompleteLessonJourneyUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly journeyRepo: JourneyRepository,
  ) {}

  async execute({ accountId, lessonId }: IInput): Promise<IOutput> {
    const journey = await this.journeyRepo.getMyJourney(accountId);

    journey.units.forEach((unit) =>
      unit.chapters.forEach((chapter) => {
        const lesson = chapter.lessons.find((lesson) => lesson.id === lessonId);

        if (lesson?.status === UserJourneyStatus.UNAVAILABLE) {
          throw new ForbiddenHTTPError('Essa lição ainda não está disponível para você');
        }
      })
    );

    try {
      await this.journeyRepo.completeLesson(lessonId, accountId);
    } catch {
      throw new InternalServerHTTPError('Aconteceu um erro ao completar essa aula');
    }
  }
}
