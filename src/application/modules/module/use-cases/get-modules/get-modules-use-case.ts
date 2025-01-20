import { LessonRepository } from '@/application/modules/lesson/repositories/lesson-repository';
import { MachineLearningModel } from '@/application/modules/machine-learning-model/entities/machine-learning-model';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Module } from '../../entities/module';
import { ModuleRepository } from '../../repositories/module-repository';

interface IInput {
  lessonId: string;
}

interface IOutput {
  modules: Module[];
  lessonMachineLearningModels: MachineLearningModel[];
}

export class GetModulesUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly moduleRepo: ModuleRepository,
    private readonly lessonRepo: LessonRepository,
  ) {}

  async execute({ lessonId }: IInput): Promise<IOutput> {
    const lesson = await this.lessonRepo.getLesson(lessonId);

    if (!lesson) {
      throw new NotFoundHTTPError('Aula não encontrada');
    }

    const { lessonMachineLearningModels, modules } = await this.moduleRepo.getModules(lessonId);

    await Promise.all(lessonMachineLearningModels.map((model) => model.generatePresignedUrls()));

    return {
      modules,
      lessonMachineLearningModels,
    };
  }
}
