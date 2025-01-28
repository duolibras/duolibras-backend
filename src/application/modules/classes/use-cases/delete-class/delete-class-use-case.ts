import { CourseRepository } from '@/application/modules/course/repositories/course-repository';
import { FileRepository } from '@/application/modules/file/repositories/file-repository';
import { ForbiddenHTTPError } from '@/application/shared/http/errors/forbidden-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { StorageProvider } from '@/application/shared/providers/storage-provider/storage-provider';
import { ClassRepository } from '../../repositories/class-repository';

interface IInput {
  classId: string;
  accountId: string;
}

type IOutput = void;

export class DeleteClassUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly classRepo: ClassRepository,
    private readonly courseRepo: CourseRepository,
    private readonly fileRepo: FileRepository,
    private readonly storageProvider: StorageProvider,
  ) {}

  async execute({ classId, accountId }: IInput): Promise<IOutput> {
    const classCourse = await this.classRepo.getClass(classId, accountId);

    if (!classCourse) {
      throw new NotFoundHTTPError('Aula não encontrada!');
    }

    if (classCourse.teacherId !== accountId) {
      throw new ForbiddenHTTPError('Você não pode deletar uma aula desse curso');
    }

    if (classCourse.bannerKey) {
      await this.storageProvider.remove(classCourse.bannerKey);
      await this.fileRepo.deleteFile(classCourse.bannerKey);
    }

    if (classCourse.videoKey) {
      await this.storageProvider.remove(classCourse.videoKey);
      await this.fileRepo.deleteFile(classCourse.videoKey);
    }

    await this.classRepo.deleteClass(classId);

    await this.courseRepo.changeCourseClassCount(classCourse.courseId, 'DECREMENT');
  }
}
