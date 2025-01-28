import { ConflictHTTPError } from '@/application/shared/http/errors/conflict-http-error';
import { ForbiddenHTTPError } from '@/application/shared/http/errors/forbidden-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { ClassRepository } from '../../repositories/class-repository';

interface IInput {
  accountId: string;
  classId: string;
}

type IOutput = void;

export class UnarchiveClassUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly classRepo: ClassRepository,
  ) {}

  async execute({ accountId, classId }: IInput): Promise<IOutput> {
    const classCourse = await this.classRepo.getClass(classId, accountId);

    if (!classCourse) {
      throw new NotFoundHTTPError('Aula não encontrado');
    }

    if (classCourse.teacherId !== accountId) {
      throw new ForbiddenHTTPError('Você não tem permissão para desarquivar essa aula pois ele pertence a outro professor');
    }

    if (!classCourse.archived) {
      throw new ConflictHTTPError('Essa aula não está arquivada!');
    }

    await this.classRepo.unarchiveClass(classId);
  }
}
