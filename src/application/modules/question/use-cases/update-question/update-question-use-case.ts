import { LessonRepository } from '@/application/modules/lesson/repositories/lesson-repository';
import { InternalServerHTTPError } from '@/application/shared/http/errors/internal-server-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';
import { Question } from '../../entities/question';
import { QuestionRepository } from '../../repositories/question-repository';

interface IInput {
  questionId: string;
  name?: string;
  description?: string;
  videoKey?: string;
  machineLearningModelId?: string;
}

interface IOutput {
  question: Question;
}

export class UpdateQuestionUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly questionRepo: QuestionRepository,
    private readonly lessonRepo: LessonRepository,
  ) {}

  async execute({ questionId, name, description, videoKey, machineLearningModelId }: IInput): Promise<IOutput> {
    const questionFound = await this.questionRepo.getQuestion(questionId);

    if (!questionFound) {
      throw new NotFoundHTTPError('Questão não encontrado');
    }

    const updatedQuestion = new Question({
      id: questionFound.id,
      name: name ?? questionFound.name,
      description: description ?? questionFound.description,
      videoKey: videoKey ?? questionFound.videoKey,
      lessonId: questionFound.lessonId,
      createdAt: questionFound.createdAt,
      type: questionFound.type,
      machineLearningModelId: machineLearningModelId ?? questionFound.machineLearningModelId,
    });

    try {
      if (machineLearningModelId) {
        await this.lessonRepo.connectMachineLearningModel(questionFound.id, machineLearningModelId);

        if (questionFound.machineLearningModelId) {
          await this.lessonRepo.disconnectMachineLearningModel(questionFound.id, questionFound.machineLearningModelId);
        }
      }

      await this.questionRepo.updateQuestion(updatedQuestion);

      return {
        question: updatedQuestion,
      };
    } catch {
      throw new InternalServerHTTPError('Algo deu errado ao atualizar a questão');
    }
  }
}
