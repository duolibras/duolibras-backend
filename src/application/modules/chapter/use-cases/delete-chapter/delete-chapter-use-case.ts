import { UnitRepository } from '@/application/modules/unit/repositories/unit-repository';
import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { ChapterRepository } from '../../repositories/chapter-repository';

interface IInput {
  chapterId: string;
}

type IOutput = void;

export class DeleteChapterUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly chapterRepo: ChapterRepository,
    private readonly unitRepo: UnitRepository,
  ) {}

  async execute({ chapterId }: IInput): Promise<void> {
    const chapter = await this.chapterRepo.getChapter(chapterId);

    if (!chapter) {
      throw new NotFoundHTTPError('Capítulo não encontrada');
    }

    const unit = await this.unitRepo.getUnit(chapter.unitId);

    if (!unit) {
      throw new NotFoundHTTPError('Unidade não encontrada');
    }

    try {
      await this.chapterRepo.deleteChapter(chapterId);

      await this.unitRepo.changeChaptersCount(unit, 'DECREMENT');
    } catch {
      throw new InternalServerHTTPError('Ocorreu um erro ao excluir capítulo');
    }
  }
}
