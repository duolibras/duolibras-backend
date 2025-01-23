import { z } from 'zod';

import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { SignInUseCase } from './sing-in-use-case';

const schema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8),
});

export class SignInController implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handle({ body }: IHttpRequest): Promise<IHttpResponse> {
    const { email, password } = schema.parse(body);

    const { accessToken, role } = await this.signInUseCase.execute({ email, password });

    return new HttpResponse({ body: { accessToken, role } }).ok();
  }
}
