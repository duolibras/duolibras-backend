import { CourseRepository } from '@/application/modules/course/repositories/course-repository';
import { ForbiddenHTTPError } from '@/application/shared/http/errors/forbidden-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { GeneratePresignedPostInput, StorageProvider } from '@/application/shared/providers/storage-provider/storage-provider';
import { Class } from '../../entities/class';
import { ClassRepository } from '../../repositories/class-repository';

interface IInput {
  name: string;
  description: string;
  courseId: string;
  accountId: string;
  archived: boolean;
  files?: {
    banner?: GeneratePresignedPostInput,
    video?: GeneratePresignedPostInput,
  }
}

interface IOutput {
  courseClass: Class;
}

export class CreateClassUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly classRepo: ClassRepository,
    private readonly courseRepo: CourseRepository,
    private readonly storageProvider: StorageProvider,
  ) {}

  async execute({ description, name, files, courseId, archived, accountId }: IInput): Promise<IOutput> {
    const course = await this.courseRepo.getCourse(courseId);

    if (!course) {
      throw new NotFoundHTTPError('Curso não encontrado!');
    }

    if (course.teacherId !== accountId) {
      throw new ForbiddenHTTPError('Você não pode criar uma aula para esse curso');
    }

    const banner = files?.banner && await this.storageProvider.generatePresignedPostUrl({
      filename: files.banner.filename,
      fileSize: files.banner.fileSize,
      fileType: files.banner.fileType,
    }, {
      expiresIn: 3600,
      publicAccess: false,
    });

    const video = files?.video && await this.storageProvider.generatePresignedPostUrl({
      filename: files.video.filename,
      fileSize: files.video.fileSize,
      fileType: files.video.fileType,
    }, {
      expiresIn: 3600,
      publicAccess: false,
    });

    const courseClass = new Class({
      name,
      description,
      courseId,
      teacherId: accountId,
      archived,
      bannerKey: banner?.fileKey,
      videoKey: video?.fileKey,
      presignedPost: {
        banner,
        video,
      }
    });

    await courseClass.generatePresignedUrl({ banner: true, video: true });

    await this.classRepo.createClass(courseClass);

    await this.courseRepo.changeCourseClassCount(courseId, 'INCREMENT');

    return {
      courseClass,
    };
  }
}
