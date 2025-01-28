import { Roles } from '@/application/modules/account/entities/account';
import { CourseRepository } from '@/application/modules/course/repositories/course-repository';
import { ForbiddenHTTPError } from '@/application/shared/http/errors/forbidden-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { ClassRepository } from '../../repositories/class-repository';

interface IInput {
  classId: string;
  accountId: string;
  role: Roles;
}

interface IOutput {
  videoUrl: string | null;
}

export class GetClassVideoUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly classRepo: ClassRepository,
    private readonly courseRepo: CourseRepository,
  ) {}

  async execute({ accountId, role, classId }: IInput): Promise<IOutput> {
    const classCourse = await this.classRepo.getClass(classId, accountId);

    if (!classCourse) {
      throw new NotFoundHTTPError('Aula não encontrado');
    }

    if (role === Roles.STUDENT) {
      const courseHasStudent = await this.courseRepo.getCourseHasStudent(classCourse.courseId, accountId);

      if (!courseHasStudent) {
        throw new ForbiddenHTTPError('Você não está matriculado nesse curso');
      }
    }

    if (role === Roles.TEACHER) {
      if (classCourse?.teacherId !== accountId) {
        throw new ForbiddenHTTPError('Você não é o criador desse curso para poder ver as aulas');
      }
    }

    await classCourse.generatePresignedUrl({ video: true });

    return {
      videoUrl: classCourse.videoUrl ?? null
    };
  }
}
