import { AccountPaymentDetailsStatus } from '@/application/modules/account/entities/account-payment-details';
import { AccountRepository } from '@/application/modules/account/repositories/account-repository';
import { ForbiddenHTTPError } from '@/application/shared/http/errors/forbidden-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { CheckoutProvider } from '@/application/shared/providers/checkout-provider/checkout-provider';
import { GeneratePresignedPostInput, StorageProvider } from '@/application/shared/providers/storage-provider/storage-provider';

import { File, FileStatus } from '@/application/modules/file/entities/file';
import { FileRepository } from '@/application/modules/file/repositories/file-repository';
import { Course } from '../../entities/course';
import { CourseRepository } from '../../repositories/course-repository';

interface IInput {
  accountId: string;
  courseId: string;
  name?: string;
  description?: string;
  preemium?: boolean;
  priceInCents?: number;
  files?: {
    banner?: GeneratePresignedPostInput,
    video?: GeneratePresignedPostInput,
  }
}

interface IOutput {
  course: Course;
}

export class UpdateCourseUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly courseRepo: CourseRepository,
    private readonly accountRepo: AccountRepository,
    private readonly fileRepository: FileRepository,
    private readonly checkoutProvider: CheckoutProvider,
    private readonly storageProvider: StorageProvider,
  ) {}

  async execute({ accountId, courseId, ...props }: IInput): Promise<IOutput> {
    const { description, name, preemium, priceInCents, files } = props;

    const course = await this.courseRepo.getCourse(courseId);

    if (!course) {
      throw new NotFoundHTTPError('Curso não encontrado');
    }

    if (course.teacherId !== accountId) {
      throw new ForbiddenHTTPError('Você não pode alterar esse curso pois ele pertence a outro processor');
    }

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
      banner: presignedBanner ? new File({
        fileKey: presignedBanner.fileKey,
        status: FileStatus.PENDING,
        presignedPost: presignedBanner
      }) : course.banner,
      video: presignedVideo ? new File({
        fileKey: presignedVideo.fileKey,
        status: FileStatus.PENDING,
        presignedPost: presignedVideo
      }) : course.video,
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

          const updatedPresigedBanner = files?.banner && await this.storageProvider.generatePresignedPostUrl({
            filename: files.banner.filename,
            fileType: files.banner.fileType,
            fileSize: files.banner.fileSize,
          }, { expiresIn: 3600, publicAccess: true, stripe: {
            isStripeImage: true,
            stripeAccountId: paymentDetails.stripeAccountId,
            stripeProductId: stripeCourseId,
          } });

          updatedCourse.banner = updatedPresigedBanner && new File({
            fileKey: updatedPresigedBanner.fileKey,
            status: FileStatus.PENDING,
            presignedPost: updatedPresigedBanner
          });
        }
      }

      if (course.preemium && !updatedCourse.preemium) {
        if (course.stripeCourseId) {
          await this.checkoutProvider.archiveCourse(course.stripeCourseId, paymentDetails.stripeAccountId);
        }
      }

      if (course.preemium && updatedCourse.preemium && files?.banner) {
        if (course.stripeCourseId) {
          const updatedPresigedBanner = files.banner && await this.storageProvider.generatePresignedPostUrl({
            filename: files.banner.filename,
            fileType: files.banner.fileType,
            fileSize: files.banner.fileSize,
          }, { expiresIn: 3600, publicAccess: true, stripe: {
            isStripeImage: true,
            stripeAccountId: paymentDetails.stripeAccountId,
            stripeProductId: course.stripeCourseId,
          } });

          updatedCourse.banner = updatedPresigedBanner && new File({
            fileKey: updatedPresigedBanner.fileKey,
            status: FileStatus.PENDING,
            presignedPost: updatedPresigedBanner
          });
        }
      }

      await this.checkoutProvider.updateCourse(paymentDetails.stripeAccountId, updatedCourse);
    }

    if (files?.banner && course.banner) {
      await this.storageProvider.remove(course.banner.fileKey);
      await this.fileRepository.deleteFile(course.banner.fileKey);
    }

    if (files?.video && course.video) {
      await this.storageProvider.remove(course.video.fileKey);
      await this.fileRepository.deleteFile(course.video.fileKey);
    }

    await this.courseRepo.updateCourse(updatedCourse);

    return {
      course: updatedCourse,
    };
  }
}
