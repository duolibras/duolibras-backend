import { ChangeChaptersCountUseCase } from '@/application/modules/unit/use-cases/change-chapters-count/change-chapters-count-use-case';
import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Chapter } from '../../entities/chapter';
import { ChapterRepository } from '../../repositories/chapter-repository';

interface IInput {
  name: string;
  description: string;
  unitId: string;
}

interface IOutput {
  chapter: Chapter;
}

export class CreateChapterUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly chapterRepo: ChapterRepository,
    private readonly changeChaptersCountUseCase: ChangeChaptersCountUseCase,
  ) {}

  async execute({ name, description, unitId }: IInput): Promise<IOutput> {
    const chapter = new Chapter({
      name,
      description,
      unitId,
      lessonsCount: 0,
    });

    try {
      await this.chapterRepo.createChapter(chapter);

      await this.changeChaptersCountUseCase.execute({ operation: 'INCREMENT', unitId: chapter.unitId });

      return {
        chapter
      };
    } catch {
      throw new InternalServerHTTPError('Erro ao criar capítulo;');
    }
  }
}
