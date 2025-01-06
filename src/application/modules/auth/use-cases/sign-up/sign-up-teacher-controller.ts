import { z } from 'zod';

import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { Roles } from '../../entities/account';
import { SignUpUseCase } from './sign-up-use-case';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email().min(1),
  password: z.string().min(8),
});

export class SignUpTeacherController implements IController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle({ body }: IHttpRequest): Promise<IHttpResponse> {
    const { email, name, password } = schema.parse(body);

    await this.signUpUseCase.execute({ email, name, password, roleCode: Roles.TEACHER });

    return new HttpResponse().noContent();
  }
}
