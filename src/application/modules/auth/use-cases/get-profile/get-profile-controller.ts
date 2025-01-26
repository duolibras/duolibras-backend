
import { AccountMapper } from '@/application/modules/account/mappers/account-mapper';
import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { GetProfileUseCase } from './get-profile-use-case';

const schema = z.object({
  id: z.string().ulid(),
});

export class GetProfileController implements IController {
  constructor(
    private readonly useCase: GetProfileUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { id } = schema.parse(request.account);

    const { account } = await this.useCase.execute({ accountId: id });

    return new HttpResponse({ body: { account: AccountMapper.toHttp(account) } }).ok();
  }
}
