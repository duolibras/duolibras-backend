import { AccountRepository } from '@/application/modules/account/repositories/account-repository';
import { BadRequestHttpError } from '@/application/shared/http/errors/bad-request-http-error';
import { ConflictHTTPError } from '@/application/shared/http/errors/conflict-http-error';
import { ForbiddenHTTPError } from '@/application/shared/http/errors/forbidden-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { CheckoutProvider } from '@/application/shared/providers/checkout-provider/checkout-provider';
import { CourseRepository } from '../../repositories/course-repository';

interface IInput {
  accountId: string;
  courseId: string;
}

type IOutput = void;

export class ArchiveCourseUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly courseRepo: CourseRepository,
    private readonly accountRepo: AccountRepository,
    private readonly checkoutProvider: CheckoutProvider,
  ) {}

  async execute({ accountId, courseId }: IInput): Promise<IOutput> {
    const course = await this.courseRepo.getCourse(courseId);

    if (!course) {
      throw new NotFoundHTTPError('Curso não encontrado');
    }

    if (course.teacherId !== accountId) {
      throw new ForbiddenHTTPError('Você não tem permissão para arquivar esse curso pois ele pertence a outro professor');
    }

    if (course.archived) {
      throw new ConflictHTTPError('Esse curso já está arquivado!');
    }

    if (course.preemium) {
      const paymentDetails = await this.accountRepo.getAccountPaymentDetails(accountId);

      if (!paymentDetails?.stripeAccountId || !course.stripeCourseId) {
        throw new BadRequestHttpError('O curso não tem produto criado no stripe');
      }

      await this.checkoutProvider.archiveCourse(course.stripeCourseId, paymentDetails.stripeAccountId);
    }

    await this.courseRepo.archiveCourse(courseId);
  }
}
