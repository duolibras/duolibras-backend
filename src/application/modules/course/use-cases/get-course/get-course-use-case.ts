import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Course } from '../../entities/course';
import { CourseRepository } from '../../repositories/course-repository';

interface IInput {
  courseId: string;
}

interface IOutput {
  course: Course;
}

export class GetCourseUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly courseRepo: CourseRepository,
  ) {}

  async execute({ courseId }: IInput): Promise<IOutput> {
    const course = await this.courseRepo.getCourse(courseId);

    if (!course) {
      throw new NotFoundHTTPError('Curso não encontrado');
    }

    return {
      course,
    };
  }
}
