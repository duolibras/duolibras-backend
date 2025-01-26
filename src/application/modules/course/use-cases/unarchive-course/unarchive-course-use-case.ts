import { ConflictHTTPError } from '@/application/shared/http/errors/conflict-http-error';
import { ForbiddenHTTPError } from '@/application/shared/http/errors/forbidden-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { CourseRepository } from '../../repositories/course-repository';

interface IInput {
  accountId: string;
  courseId: string;
}

type IOutput = void;

export class UnarchiveCourseUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly courseRepo: CourseRepository
  ) {}

  async execute({ accountId, courseId }: IInput): Promise<IOutput> {
    const course = await this.courseRepo.getCourse(courseId);

    if (!course) {
      throw new NotFoundHTTPError('Curso não encontrado');
    }

    if (course.teacherId !== accountId) {
      throw new ForbiddenHTTPError('Você não tem permissão para desarquivar esse curso pois ele pertence a outro professor');
    }

    if (!course.archived) {
      throw new ConflictHTTPError('Esse curso não está arquivado!');
    }

    await this.courseRepo.unarchiveCourse(courseId);
  }
}
