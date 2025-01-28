import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { StorageProvider } from '@/application/shared/providers/storage-provider/storage-provider';
import { CourseRepository } from '../../repositories/course-repository';

interface IInput {
  courseId: string;
}

interface IOutput {
  videoUrl: string | null;
}

export class GetCoursePreviewUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly courseRepo: CourseRepository,
    private readonly storageProvider: StorageProvider,
  ) {}

  async execute({ courseId }: IInput): Promise<IOutput> {
    const videoKey = await this.courseRepo.getCoursePreviewKey(courseId);

    const videoUrl = videoKey && await this.storageProvider.generatePresignedUrl(videoKey, 3600, true);

    return {
      videoUrl
    };
  }

}
