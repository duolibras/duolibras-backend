import { Roles } from '@/application/modules/account/entities/account';
import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { ClassMapper } from '../../mappers/class-mapper';
import { GetClassesUseCase } from './get-classes-use-case';

const schema = z.object({
  courseId: z.string().ulid(),
  accountId: z.string().ulid(),
  role: z.nativeEnum(Roles),
});

export class GetClassesController implements IController {
  constructor(
    private readonly useCase: GetClassesUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const parsedBody = schema.parse({
      accountId: request.account?.id,
      role: request.account?.role,
      ...request.params,
    });

    const { classes } = await this.useCase.execute(parsedBody);

    return new HttpResponse({
      body: {
        classes: classes.map(ClassMapper.toSummaryHttp)
      }
    }).ok();
  }
}
