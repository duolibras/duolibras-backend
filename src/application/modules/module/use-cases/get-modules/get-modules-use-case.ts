import { LessonRepository } from '@/application/modules/lesson/repositories/lesson-repository';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Module } from '../../entities/module';
import { ModuleRepository } from '../../repositories/module-repository';

interface IInput {
  lessonId: string;
}

interface IOutput {
  modules: Module[];
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

    const modules = await this.moduleRepo.getModules(lessonId);

    return {
      modules
    };
  }
}
