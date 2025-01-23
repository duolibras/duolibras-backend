
import { Answer } from '@/application/modules/answer/entities/answer';
import { LessonRepository } from '@/application/modules/lesson/repositories/lesson-repository';
import { MachineLearningModelRepository } from '@/application/modules/machine-learning-model/repositories/machine-learning-model-repository';
import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { StorageProvider } from '@/application/shared/providers/storage-provider/storage-provider';
import { Question, QuestionType } from '../../entities/question';
import { QuestionRepository } from '../../repositories/question-repository';

interface IInput {
  name: string;
  description: string;
  video?: string;
  lessonId: string;
  type: QuestionType;
  machineLearningModelId?: string;
  answer?: string;
  answers?: {
    description: string;
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
    private readonly machineLearningModelRepo: MachineLearningModelRepository,
    private readonly storageProvider: StorageProvider,
  ) {}

  async execute({ name, lessonId, description, video, type, answers, machineLearningModelId, answer }: IInput): Promise<IOutput> {
    const lesson = await this.lessonRepo.getLesson(lessonId);

    if (!lesson) {
      throw new NotFoundHTTPError('Aula não encontrado');
    }

    if (machineLearningModelId) {
      const machineLearningModel = await this.machineLearningModelRepo.getMachineLearningModel(machineLearningModelId);

      if (!machineLearningModel) {
        throw new NotFoundHTTPError('Modelo de machine learning não encontrado');
      }

      await this.lessonRepo.connectMachineLearningModel(lesson.id, machineLearningModel.id);
    }

    if (video) {
      const videoKey = await this.storageProvider.save(video);

      if (!videoKey) {
        throw new InternalServerHTTPError('Erro ao salvar vídeo');
      }

      video = videoKey.fileKey;
    }

    const question = new Question({
      name,
      description,
      lessonId,
      videoKey: video,
      type,
      answer,
      machineLearningModelId,
    });

    await question.generatePresignedUrl();

    question.answers = answers?.map(({ description, isCorrect }) => new Answer({
      description,
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
