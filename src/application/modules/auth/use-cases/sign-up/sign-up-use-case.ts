import { ConflictHTTPError } from '@/application/shared/http/errors/conflict-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { HashProvider } from '@/application/shared/providers/hash-provider/hash-provider';
import { Account, Roles } from '../../entities/account';
import { AuthRepository } from '../../repositories/auth-repository';

interface IInput {
  name: string;
  email: string;
  password: string;
  roleCode: Roles;
}

type IOutput = void;

export class SignUpUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly hashProvider: HashProvider,
  ) {}

  async execute({ email, name, password, roleCode }: IInput): Promise<IOutput> {
    const accountAlreadyExists = await this.authRepo.accountExists(email);

    if (accountAlreadyExists) {
      throw new ConflictHTTPError('Já existe uma conta cadastrada com esse e-mail!');
    }

    const hashedPassword = await this.hashProvider.encrypt(password);

    const account = new Account({
      email,
      name,
      password: hashedPassword,
      roleCode,
    });

    await this.authRepo.createAccount(account);
  }
}
