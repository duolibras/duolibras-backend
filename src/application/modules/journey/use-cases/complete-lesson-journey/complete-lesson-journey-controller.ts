import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { CompleteLessonJourneyUseCase } from './complete-lesson-journey-use-case';

const schema = z.object({
  accountId: z.string().ulid(),
  lessonId: z.string().ulid(),
});

export class CompleteLessonJourneyController implements IController {
  constructor(
    private readonly useCase: CompleteLessonJourneyUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const account = request.account;

    const parsedBody = schema.parse({
      ...request.params,
      accountId: account?.id,
    });

    await this.useCase.execute(parsedBody);

    return new HttpResponse({
      body: {
        message: 'Lição concluida com sucesso!'
      }
    }).created();
  }
}
