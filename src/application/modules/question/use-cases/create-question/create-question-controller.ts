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
  video: z.object({ path: z.string() }).transform(v => v.path).optional(),
  machineLearningModelId: z.string().ulid().optional(),
  answers: z.string().transform(v => JSON.parse(v)).refine(
    v => {
      console.log(v);
      return answersSchema.parse(v);
    },
  ).optional(),
});

const answersSchema = z.array(z.object({
  description: z.string(),
  isCorrect: z.boolean(),
}));

export class CreateQuestionController implements IController {
  constructor(
    private readonly useCase: CreateQuestionUseCase,
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const video = request.file ? request.file : undefined;

    const { ...parsedBody } = schema.parse({
      ...request.body,
      video,
    });

    const { question } = await this.useCase.execute(parsedBody);

    return new HttpResponse({
      body: {
        question: QuestionMapper.toHttp(question),
      }
    }).created();
  }
}
