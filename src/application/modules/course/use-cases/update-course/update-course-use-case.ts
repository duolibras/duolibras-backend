import { AccountPaymentDetailsStatus } from '@/application/modules/account/entities/account-payment-details';
import { AccountRepository } from '@/application/modules/account/repositories/account-repository';
import { ForbiddenHTTPError } from '@/application/shared/http/errors/forbidden-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { CheckoutProvider } from '@/application/shared/providers/checkout-provider/checkout-provider';
import { Course } from '../../entities/course';
import { CourseRepository } from '../../repositories/course-repository';

interface IInput {
  accountId: string;
  courseId: string;
  name?: string;
  description?: string;
  preemium?: boolean;
  priceInCents?: number;
}

interface IOutput {
  course: Course;
}

export class UpdateCourseUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly courseRepo: CourseRepository,
    private readonly accountRepo: AccountRepository,
    private readonly checkoutProvider: CheckoutProvider,
  ) {}

  async execute({ accountId, courseId, ...props }: IInput): Promise<IOutput> {
    const { description, name, preemium, priceInCents } = props;

    const course = await this.courseRepo.getCourse(courseId);

    if (!course) {
      throw new NotFoundHTTPError('Curso não encontrado');
    }

    if (course.teacherId !== accountId) {
      throw new ForbiddenHTTPError('Você não pode alterar esse curso pois ele pertence a outro processor');
    }

    const updatedCourse = new Course({
      id: course.id,
      name: name ?? course.name,
      description: description ?? course.description,
      preemium: preemium ?? course.preemium,
      priceInCents: priceInCents ?? course.priceInCents,
      archived: course.archived,
      classCount: course.classCount,
      studentsCount: course.studentsCount,
      teacherId: course.teacherId,
      createdAt: course.createdAt,
      stripeCourseId: course.stripeCourseId,
    });

    if (course.preemium !== updatedCourse.preemium || updatedCourse.preemium) {
      const paymentDetails = await this.accountRepo.getAccountPaymentDetails(accountId);

      if (!paymentDetails || paymentDetails.status !== AccountPaymentDetailsStatus.COMPLETED) {
        throw new ForbiddenHTTPError('Para alterar valor ou tipo do curso, é necessário cadastrar ou atualizar seus detalhes de pagamento');
      }

      if (!course.preemium && updatedCourse.preemium) {
        if (course.stripeCourseId) {
          await this.checkoutProvider.unarchiveCourse(course.stripeCourseId, paymentDetails.stripeAccountId);
        } else {
          const { stripeCourseId } =
            await this.checkoutProvider.createCourse(paymentDetails.stripeAccountId, updatedCourse);

          updatedCourse.stripeCourseId = stripeCourseId;
        }
      }

      if (course.preemium && !updatedCourse.preemium) {
        if (course.stripeCourseId) {
          await this.checkoutProvider.archiveCourse(course.stripeCourseId, paymentDetails.stripeAccountId);
        }
      }

      await this.checkoutProvider.updateCourse(paymentDetails.stripeAccountId, updatedCourse);
    }

    await this.courseRepo.updateCourse(updatedCourse);

    return {
      course: updatedCourse,
    };
  }
}
