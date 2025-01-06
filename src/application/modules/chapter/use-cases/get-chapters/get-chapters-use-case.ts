import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Chapter } from '../../entities/chapter';
import { ChapterRepository } from '../../repositories/chapter-repository';

interface IInput {
  unitId: string;
}

interface IOutput {
  chapters: Chapter[];
}

export class GetChaptersUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly chapterRepo: ChapterRepository,
  ) {}

  async execute({ unitId }: IInput): Promise<IOutput> {
    const chapters = await this.chapterRepo.getChapters(unitId);

    return {
      chapters
    };
  }
}
