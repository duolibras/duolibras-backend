import { UnitRepository } from '@/application/modules/unit/repositories/unit-repository';
import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
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
    private readonly unitRepo: UnitRepository,
  ) {}

  async execute({ name, description, unitId }: IInput): Promise<IOutput> {
    const unit = await this.unitRepo.getUnit(unitId);

    if (!unit) {
      throw new NotFoundHTTPError('Unidade não encontrada');
    }

    const chapter = new Chapter({
      name,
      description,
      unitId,
      lessonsCount: 0,
    });

    try {
      await this.chapterRepo.createChapter(chapter);

      await this.unitRepo.changeChaptersCount(unit, 'INCREMENT');

      return {
        chapter
      };
    } catch {
      throw new InternalServerHTTPError('Erro ao criar capítulo;');
    }
  }
}
