import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { DeleteUnitUseCase } from './delete-unit-use-case';

const schema = z.object({
  unitId: z.string().ulid(),
});

export class DeleteUnitController implements IController {
  constructor(
    private readonly useCase: DeleteUnitUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { unitId } = schema.parse({ ...request.params });

    await this.useCase.execute({ unitId });

    return new HttpResponse().noContent();
  }
}
