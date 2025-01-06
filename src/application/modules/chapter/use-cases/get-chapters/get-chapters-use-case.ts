import { UnitRepository } from '@/application/modules/unit/repositories/unit-repository';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
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
    private readonly unitRepo: UnitRepository,
  ) {}

  async execute({ unitId }: IInput): Promise<IOutput> {
    const unit = await this.unitRepo.getUnit(unitId);

    if (!unit) {
      throw new NotFoundHTTPError('Unidade não encontrada');
    }

    const chapters = await this.chapterRepo.getChapters(unitId);

    return {
      chapters
    };
  }
}
