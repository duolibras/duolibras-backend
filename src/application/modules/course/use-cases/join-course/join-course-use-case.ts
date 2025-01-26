import { AccountPaymentDetailsStatus } from '@/application/modules/account/entities/account-payment-details';
import { AccountRepository } from '@/application/modules/account/repositories/account-repository';
import { ConflictHTTPError } from '@/application/shared/http/errors/conflict-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { CheckoutProvider } from '@/application/shared/providers/checkout-provider/checkout-provider';
import { ICheckoutCourseUrlResponse } from '@/application/shared/providers/checkout-provider/types';
import { CourseStudent, CourseStudentPaymentStatus } from '../../entities/course-student';
import { CourseRepository } from '../../repositories/course-repository';

interface IInput {
  courseId: string;
  accountId: string;
  cancelUrl: string;
  successUrl: string;
}

interface IOutput {
  checkoutUrl?: string | null;
}

export class JoinCourseUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly accountRepo: AccountRepository,
    private readonly courseRepo: CourseRepository,
    private readonly checkoutProvider: CheckoutProvider,
  ) {}

  async execute({ courseId, accountId, cancelUrl, successUrl }: IInput): Promise<IOutput> {
    const course = await this.courseRepo.getCourse(courseId);

    if (!course) {
      throw new NotFoundHTTPError('Curso não encontrado');
    }

    const courseStudentFound = await this.courseRepo.getCourseStudent(courseId, accountId);

    const checkout = {} as Partial<ICheckoutCourseUrlResponse>;

    if (course.preemium) {
      if (courseStudentFound && courseStudentFound.paymentStatus === CourseStudentPaymentStatus.APPROVED) {
        throw new ConflictHTTPError('Esse usuário já é aluno desse curso');
      }

      if (courseStudentFound && courseStudentFound.paymentStatus === CourseStudentPaymentStatus.PENDING) {
        console.log('cai nesse caso aqui');
        return {
          checkoutUrl: courseStudentFound.checkoutUrl,
        };
      }

      const accountPaymentDetails = await this.accountRepo.getAccountPaymentDetails(course.teacherId);

      if (!accountPaymentDetails || accountPaymentDetails.status !== AccountPaymentDetailsStatus.COMPLETED) {
        throw new NotFoundHTTPError('O professor que criou esse curso não tem uma conta ou não terminou a verificação da conta no stripe');
      }

      const { url, checkoutSessionId } = await this.checkoutProvider.generateCheckoutCourseUrl(
        accountPaymentDetails.stripeAccountId,
        course,
        { cancelUrl, successUrl }
      );

      checkout.url = url;
      checkout.checkoutSessionId = checkoutSessionId;
    }

    const courseStudent = new CourseStudent({
      courseId: course.id,
      studentId: accountId,
      checkoutSessionId: checkout.checkoutSessionId,
      checkoutUrl: checkout.url,
      paymentStatus: course.preemium
        ? CourseStudentPaymentStatus.PENDING
        : CourseStudentPaymentStatus.APPROVED,
    });

    if (courseStudentFound && course.preemium) {
      await this.courseRepo.updateCourseStudentCheckoutSession(courseStudent);
    } else {
      await this.courseRepo.joinCourse(courseStudent);
    }


    return {
      checkoutUrl: checkout.url,
    };
  }

}
