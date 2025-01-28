import { FileRepository } from '@/application/modules/file/repositories/file-repository';
import { ForbiddenHTTPError } from '@/application/shared/http/errors/forbidden-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { GeneratePresignedPostInput, StorageProvider } from '@/application/shared/providers/storage-provider/storage-provider';
import { Class } from '../../entities/class';
import { ClassRepository } from '../../repositories/class-repository';

interface IInput {
  classId: string;
  accountId: string;
  name?: string;
  description?: string;
  files?: {
    banner?: GeneratePresignedPostInput,
    video?: GeneratePresignedPostInput,
  }
}

interface IOutput {
  courseClass: Class;
}

export class UpdateClassUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly classRepo: ClassRepository,
    private readonly fileRepo: FileRepository,
    private readonly storageProvider: StorageProvider,
  ) {}

  async execute({ description, name, files, classId, accountId }: IInput): Promise<IOutput> {
    const classCourse = await this.classRepo.getClass(classId, accountId);

    if (!classCourse) {
      throw new NotFoundHTTPError('Aula não encontrada!');
    }

    if (classCourse.teacherId !== accountId) {
      throw new ForbiddenHTTPError('Você não pode editar uma aula desse curso');
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

    const updatedClass = new Class({
      id: classCourse.id,
      name: name ?? classCourse.name,
      description: description ?? classCourse.description,
      courseId: classCourse.courseId,
      teacherId: accountId,
      archived: classCourse.archived,
      bannerKey: video?.fileKey ?? classCourse.bannerKey,
      videoKey: video?.fileKey ?? classCourse.videoKey,
      createdAt: classCourse.createdAt,
      updatedAt: classCourse.updatedAt,
      presignedPost: {
        banner,
        video,
      }
    });

    if (files?.banner && classCourse.bannerKey) {
      await this.storageProvider.remove(classCourse.bannerKey);
      await this.fileRepo.deleteFile(classCourse.bannerKey);
    }

    if (files?.video && classCourse.videoKey) {
      await this.storageProvider.remove(classCourse.videoKey);
      await this.fileRepo.deleteFile(classCourse.videoKey);
    }

    await updatedClass.generatePresignedUrl({ banner: true, video: true });

    await this.classRepo.updateClass(updatedClass);

    return {
      courseClass: updatedClass,
    };
  }
}
