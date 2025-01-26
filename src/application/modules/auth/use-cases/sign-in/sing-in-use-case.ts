import { Roles } from '@/application/modules/account/entities/account';
import { UnauthorizedHTTPError } from '@/application/shared/http/errors/unauthorized-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { HashProvider } from '@/application/shared/providers/hash-provider/hash-provider';
import { TokenProvider } from '@/application/shared/providers/token-provider/token-provider';
import { AuthRepository } from '../../repositories/auth-repository';

interface IInput {
  email: string;
  password: string;
}

interface IOutput {
  accessToken: string;
  role: Roles;
}

export class SignInUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly hashProvider: HashProvider,
    private readonly tokenProvider: TokenProvider,
  ) {}

  async execute({ email, password }: IInput): Promise<IOutput> {
    const account = await this.authRepo.findByEmail(email);

    if (!account) {
      throw new UnauthorizedHTTPError('Credenciais inválidas');
    }

    const isPasswordValid = await this.hashProvider.compare(password, account.password);

    if (!isPasswordValid) {
      throw new UnauthorizedHTTPError('Credenciais inválidas');
    }

    const accessToken = this.tokenProvider.generateToken({
      sub: account.id,
      role: account.roleCode,
      expiresIn: '1d',
    });

    return {
      accessToken,
      role: account.roleCode,
    };
  }
}
