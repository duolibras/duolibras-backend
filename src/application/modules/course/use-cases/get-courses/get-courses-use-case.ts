import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Course } from '../../entities/course';
import { CourseRepository } from '../../repositories/course-repository';

interface IInput {
  accountId: string;
  teacherId?: string;
  owned?: boolean;
  creator?: boolean;
  archived?: boolean;
}

interface IOutput {
  courses: Course[]
}

export class GetCoursesUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly courseRepo: CourseRepository,
  ) {}

  async execute({ accountId, ...query }: IInput): Promise<IOutput> {
    const courses = await this.courseRepo.getCourses(accountId, query);

    return {
      courses,
    };
  }
}
