import { AccountPaymentDetailsStatus } from '@/application/modules/account/entities/account-payment-details';
import { AccountRepository } from '@/application/modules/account/repositories/account-repository';
import { ForbiddenHTTPError } from '@/application/shared/http/errors/forbidden-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { CheckoutProvider } from '@/application/shared/providers/checkout-provider/checkout-provider';
import { Course } from '../../entities/course';
import { CourseRepository } from '../../repositories/course-repository';

interface IInput {
  name: string;
  description: string;
  accountId: string;
  preemium: boolean;
  priceInCents: number;
}

interface IOutput {
  course: Course;
}

export class CreateCourseUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly accountRepo: AccountRepository,
    private readonly courseRepo: CourseRepository,
    private readonly checkoutProvider: CheckoutProvider,
  ) {}

  async execute(input: IInput): Promise<IOutput> {
    const { accountId, preemium, description, name, priceInCents } = input;

    const course = new Course({
      name,
      description,
      preemium,
      teacherId: accountId,
      classCount: 0,
      priceInCents,
    });


    if (preemium) {
      const accountPaymentsDetails = await this.accountRepo.getAccountPaymentDetails(accountId);

      if (!accountPaymentsDetails) {
        throw new ForbiddenHTTPError('Para criar um curso pago, você precisa cadastrar seus detalhes de pagamento!');
      }

      if (accountPaymentsDetails.status !== AccountPaymentDetailsStatus.COMPLETED) {
        throw new ForbiddenHTTPError('Para criar um curso pago, você precisa completar os detalhes da sua conta de pagamento');
      }

      const { stripeCourseId } =
        await this.checkoutProvider.createCourse(accountPaymentsDetails.stripeAccountId, course);
      course.stripeCourseId = stripeCourseId;
    }

    await this.courseRepo.createCourse(course);

    return {
      course
    };
  }
}
