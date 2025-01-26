import { ForbiddenHTTPError } from '@/application/shared/http/errors/forbidden-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { CourseRepository } from '../../repositories/course-repository';

interface IInput {
  accountId: string;
  courseId: string;
}

type IOutput = void;

export class DeleteCourseUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly courseRepo: CourseRepository
  ) {}

  async execute({ accountId, courseId }: IInput): Promise<IOutput> {
    const course = await this.courseRepo.getCourse(courseId);

    if (!course) {
      throw new NotFoundHTTPError('Curso não encontrado');
    }

    if (course.teacherId !== accountId) {
      throw new ForbiddenHTTPError('Você não tem permissão para excluir esse curso pois ele pertence a outro professor');
    }

    const courseHasStudents = await this.courseRepo.courseHasStudents(courseId);

    if (courseHasStudents) {
      throw new ForbiddenHTTPError('Esse curso não pode ser excluido pois já foi assinado por alguns alunos, você pode arquivar o curso para evitar novas compras!');
    }

    await this.courseRepo.deleteCourse(courseId);
  }
}
