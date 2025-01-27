import { AccountPaymentDetailsStatus } from '@/application/modules/account/entities/account-payment-details';
import { AccountRepository } from '@/application/modules/account/repositories/account-repository';
import { File, FileStatus } from '@/application/modules/file/entities/file';
import { ForbiddenHTTPError } from '@/application/shared/http/errors/forbidden-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { CheckoutProvider } from '@/application/shared/providers/checkout-provider/checkout-provider';
import { GeneratePresignedPostInput, StorageProvider } from '@/application/shared/providers/storage-provider/storage-provider';
import { Course } from '../../entities/course';
import { CourseRepository } from '../../repositories/course-repository';


interface IInput {
  name: string;
  description: string;
  accountId: string;
  preemium: boolean;
  priceInCents?: number;
  archived: boolean;
  files?: {
    banner?: GeneratePresignedPostInput,
    video?: GeneratePresignedPostInput,
  }
}

interface IOutput {
  course: Course;
}

export class CreateCourseUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly accountRepo: AccountRepository,
    private readonly courseRepo: CourseRepository,
    private readonly checkoutProvider: CheckoutProvider,
    private readonly storageProvider: StorageProvider,
  ) {}

  async execute(input: IInput): Promise<IOutput> {
    const { accountId, preemium, description, name, priceInCents, archived, files } = input;

    const presignedBanner = files?.banner && await this.storageProvider.generatePresignedPostUrl({
      filename: files.banner.filename,
      fileType: files.banner.fileType,
      fileSize: files.banner.fileSize,
    }, { expiresIn: 3600, publicAccess: true });


    const presignedVideo = files?.video && await this.storageProvider.generatePresignedPostUrl({
      filename: files.video.filename,
      fileType: files.video.fileType,
      fileSize: files.video.fileSize,
    }, { expiresIn: 3600, publicAccess: false });

    const course = new Course({
      name,
      description,
      archived,
      preemium,
      teacherId: accountId,
      studentsCount: 0,
      classCount: 0,
      priceInCents,
      banner: presignedBanner && new File({
        fileKey: presignedBanner.fileKey,
        status: FileStatus.PENDING,
        presignedPost: presignedBanner
      }),
      video: presignedVideo && new File({
        fileKey: presignedVideo.fileKey,
        status: FileStatus.PENDING,
        presignedPost: presignedVideo
      }),
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

      const updatedPresigedBanner = files?.banner && await this.storageProvider.generatePresignedPostUrl({
        filename: files.banner.filename,
        fileType: files.banner.fileType,
        fileSize: files.banner.fileSize,
      }, { expiresIn: 3600, publicAccess: true, stripe: {
        isStripeImage: true,
        stripeAccountId: accountPaymentsDetails.stripeAccountId,
        stripeProductId: stripeCourseId,
      } });

      course.banner = updatedPresigedBanner && new File({
        fileKey: updatedPresigedBanner.fileKey,
        status: FileStatus.PENDING,
        presignedPost: updatedPresigedBanner
      });
    }

    await this.courseRepo.createCourse(course);

    return {
      course
    };
  }
}
