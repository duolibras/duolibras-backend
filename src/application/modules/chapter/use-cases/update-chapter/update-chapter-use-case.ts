import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Chapter } from '../../entities/chapter';
import { ChapterRepository } from '../../repositories/chapter-repository';

interface IInput {
  chapterId: string;
  name?: string;
  description?: string;
}

interface IOutput {
  chapter: Chapter;
}

export class UpdateChapterUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly chapterRepo: ChapterRepository
  ) {}

  async execute({ chapterId, name, description }: IInput): Promise<IOutput> {
    const chapterFound = await this.chapterRepo.getChapter(chapterId);

    if (!chapterFound) {
      throw new NotFoundHTTPError('Capítulo não encontrada');
    }

    const updatedChapter = new Chapter({
      id: chapterFound.id,
      name: name ?? chapterFound.name,
      description: description ?? chapterFound.description,
      unitId: chapterFound.unitId,
      lessonsCount: chapterFound.lessonsCount,
      createdAt: chapterFound.createdAt,
    });

    try {
      await this.chapterRepo.updateChapter(updatedChapter);

      return {
        chapter: updatedChapter,
      };
    } catch {
      throw new InternalServerHTTPError('Algo deu errado ao atualizar a capítulo');
    }
  }
}
