import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { CountOperation } from '@/application/shared/types/count-operation';
import { ChapterRepository } from '../../repositories/chapter-repository';

interface IInput {
  chapterId: string;
  operation: CountOperation
}

type IOutPut = void;

export class ChangeLessonsCountUseCase implements IUseCase<IInput, IOutPut> {
  constructor(
    private readonly chapterRepo: ChapterRepository,
  ) {}

  async execute({ operation, chapterId }: IInput): Promise<void> {
    await this.chapterRepo.changeLessonsCount(chapterId, operation);
  }
}
