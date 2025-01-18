import { IController } from '@/application/shared/http/interfaces/controller';
import { IHttpRequest, IHttpResponse } from '@/application/shared/http/interfaces/http';
import { HttpResponse } from '@/application/shared/http/response/http-response';
import { z } from 'zod';
import { QuestionType } from '../../entities/question';
import { QuestionMapper } from '../../mappers/question-mapper';
import { CreateQuestionUseCase } from './create-question-use-case';

const schema = z.object({
  name: z.string(),
  description: z.string(),
  lessonId: z.string().ulid(),
  type: z.nativeEnum(QuestionType),
  videoUrl: z.string().url().optional(),
  answers: z.array(z.object({
    description: z.string().optional(),
    videoUrl: z.string().optional(),
    isCorrect: z.boolean(),
  })).optional(),
});

export class CreateQuestionController implements IController {
  constructor(
    private readonly useCase: CreateQuestionUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { name, description, lessonId, videoUrl, type, answers } = schema.parse(request.body);

    const { question } = await this.useCase.execute({ name, description, lessonId, videoUrl, answers, type });

    return new HttpResponse({
      body: {
        question: QuestionMapper.toHttp(question),
      }
    }).created();
  }
}
