import { AccountPaymentDetailsStatus } from '@/application/modules/account/entities/account-payment-details';
import { AccountRepository } from '@/application/modules/account/repositories/account-repository';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { CheckoutProvider } from '@/application/shared/providers/checkout-provider/checkout-provider';
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

    let checkoutUrl: string | null = null;

    if (course.preemium) {
      const accountPaymentDetails = await this.accountRepo.getAccountPaymentDetails(course.teacherId);

      if (!accountPaymentDetails || accountPaymentDetails.status !== AccountPaymentDetailsStatus.COMPLETED) {
        throw new NotFoundHTTPError('O professor que criou esse curso não tem uma conta ou não terminou a verificação da conta no stripe');
      }

      const { url } = await this.checkoutProvider.generateCheckoutCourseUrl(
        accountPaymentDetails.stripeAccountId,
        course,
        { cancelUrl, successUrl }
      );

      checkoutUrl = url;
    }

    return {
      checkoutUrl
    };
  }

}
