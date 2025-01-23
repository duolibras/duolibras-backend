import { Roles } from '@/application/modules/auth/entities/account';
import { UserJourneyStatus } from '@/application/modules/journey/entities/journey';
import { JourneyRepository } from '@/application/modules/journey/repositories/journey-repository';
import { LessonRepository } from '@/application/modules/lesson/repositories/lesson-repository';
import { MachineLearningModel } from '@/application/modules/machine-learning-model/entities/machine-learning-model';
import { ForbiddenHTTPError } from '@/application/shared/http/errors/forbidden-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Module } from '../../entities/module';
import { ModuleRepository } from '../../repositories/module-repository';

interface IInput {
  lessonId: string;
  accountRole: Roles;
  accountId: string;
}

interface IOutput {
  modules: Module[];
  lessonMachineLearningModels: MachineLearningModel[];
}

export class GetModulesUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly moduleRepo: ModuleRepository,
    private readonly lessonRepo: LessonRepository,
    private readonly journeyRepo: JourneyRepository,
  ) {}

  async execute({ lessonId, accountRole, accountId }: IInput): Promise<IOutput> {
    const lesson = await this.lessonRepo.getLesson(lessonId);

    if (!lesson) {
      throw new NotFoundHTTPError('Aula não encontrada');
    }

    if (accountRole === Roles.STUDENT) {
      const journey = await this.journeyRepo.getMyJourney(accountId);

      journey.units.forEach((unit) =>
        unit.chapters.forEach((chapter) => {
          const lesson = chapter.lessons.find((lesson) => lesson.id === lessonId);

          if (lesson?.status === UserJourneyStatus.UNAVAILABLE) {
            throw new ForbiddenHTTPError('Essa lição ainda não está disponível para você');
          }
        })
      );
    }

    const { lessonMachineLearningModels, modules } = await this.moduleRepo.getModules(lessonId);

    await Promise.all(lessonMachineLearningModels.map((model) => model.generatePresignedUrls()));

    return {
      modules,
      lessonMachineLearningModels,
    };
  }
}
