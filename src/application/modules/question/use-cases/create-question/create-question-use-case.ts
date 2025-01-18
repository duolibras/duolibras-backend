
import { Answer } from '@/application/modules/answer/entities/answer';
import { LessonRepository } from '@/application/modules/lesson/repositories/lesson-repository';
import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Question, QuestionType } from '../../entities/question';
import { QuestionRepository } from '../../repositories/question-repository';

interface IInput {
  name: string;
  description: string;
  videoUrl?: string;
  lessonId: string;
  type: QuestionType;
  answers?: {
    description?: string;
    videoUrl?: string;
    isCorrect: boolean;
  }[];
}

interface IOutput {
  question: Question;
}

export class CreateQuestionUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly questionRepo: QuestionRepository,
    private readonly lessonRepo: LessonRepository,
  ) {}

  async execute({ name, lessonId, description, videoUrl, type, answers }: IInput): Promise<IOutput> {
    const lesson = await this.lessonRepo.getLesson(lessonId);

    if (!lesson) {
      throw new NotFoundHTTPError('Aula não encontrado');
    }

    const question = new Question({
      name,
      description,
      lessonId,
      videoUrl,
      type,
    });

    question.answers = answers?.map(({ description, isCorrect, videoUrl }) => new Answer({
      description,
      videoUrl,
      isCorrect,
      questionId: question.id,
    })) ?? [];

    try {
      await this.questionRepo.createQuestion(question);

      await this.lessonRepo.changeModulesCount(lesson.id, 'INCREMENT');

      return {
        question
      };
    } catch {
      throw new InternalServerHTTPError('Erro ao criar questão');
    }
  }
}
