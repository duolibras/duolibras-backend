import { Roles } from '@/application/modules/account/entities/account';
import { CourseRepository } from '@/application/modules/course/repositories/course-repository';
import { ForbiddenHTTPError } from '@/application/shared/http/errors/forbidden-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Class } from '../../entities/class';
import { ClassRepository } from '../../repositories/class-repository';

interface IInput {
  courseId: string;
  accountId: string;
  role: Roles;
}

interface IOutput {
  classes: Class[]
}

export class GetClassesUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly classRepo: ClassRepository,
    private readonly courseRepo: CourseRepository,
  ) {}

  async execute({ courseId, accountId, role }: IInput): Promise<IOutput> {
    const course = await this.courseRepo.getCourse(courseId);

    if (!course) {
      throw new NotFoundHTTPError('Curso não encontrado');
    }

    if (role === Roles.STUDENT) {
      const courseHasStudent = await this.courseRepo.getCourseHasStudent(courseId, accountId);

      if (!courseHasStudent) {
        throw new ForbiddenHTTPError('Você não está matriculado nesse curso');
      }
    }

    if (role === Roles.TEACHER) {
      if (course?.teacherId !== accountId) {
        throw new ForbiddenHTTPError('Você não é o criador desse curso para poder ver as aulas');
      }
    }

    const classes = await this.classRepo.getClasses(courseId, accountId);

    const commands = classes.map((classCourse) => classCourse.generatePresignedUrl({ banner: true }));

    await Promise.all(commands);

    return {
      classes
    };
  }
}
