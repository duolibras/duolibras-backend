import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { JoinCourseUseCase } from './join-course-use-case';

const schema = z.object({
  courseId: z.string().ulid(),
  accountId: z.string().ulid(),
  cancelUrl: z.string().url(),
  successUrl: z.string().url(),
});

export class JoinCourseController implements IController {
  constructor(
    private readonly useCase: JoinCourseUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const parsedBody = schema.parse({
      accountId: request.account?.id,
      ...request.params,
      ...request.body,
    });

    const { checkoutUrl } = await this.useCase.execute(parsedBody);

    return new HttpResponse({
      body: {
        message: !checkoutUrl ? 'Matrículado com sucesso' : undefined,
        checkoutUrl,
      }
    }).created();
  }
}
