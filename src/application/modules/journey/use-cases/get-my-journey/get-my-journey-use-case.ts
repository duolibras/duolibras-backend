import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Journey } from '../../entities/journey';
import { JourneyRepository } from '../../repositories/journey-repository';

interface IInput {
  accountId?: string;
}

interface IOutput {
  journey: Journey;
}

export class GetMyJourneyUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly journeyRepo: JourneyRepository,
  ) {}

  async execute(input: IInput): Promise<IOutput> {
    const { accountId } = input;

    const journey = await this.journeyRepo.getJourney(accountId);

    return {
      journey
    };
  }
}
