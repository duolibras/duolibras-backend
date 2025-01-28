import { Account } from '@/application/modules/account/entities/account';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { AuthRepository } from '../../repositories/auth-repository';

interface IInput {
  accountId: string;
}

interface IOutput {
  account: Account;
}

export class GetProfileUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly authRepo: AuthRepository,
  ) {}

  async execute({ accountId }: IInput): Promise<IOutput> {
    const account = await this.authRepo.getProfile(accountId);

    if (!account) {
      throw new NotFoundHTTPError('Conta não encontrada');
    }

    return {
      account,
    };
  }
}
