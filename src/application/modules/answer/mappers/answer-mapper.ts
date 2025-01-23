import { Prisma, Answer as RawAnswer } from '@prisma/client';
import { Answer } from '../entities/answer';

export class AnswerMapper {
  static toPersistence(answer: Answer): Prisma.AnswerCreateInput {
    return {
      id: answer.id,
      isCorrect: answer.isCorrect,
      description: answer.description,
      videoKey: answer.videoKey,
      question: {
        connect: {
          id: answer.questionId,
        }
      },
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    };
  }

  static toQuestionPersistence(answer: Answer): Prisma.AnswerCreateManyQuestionInput {
    return {
      id: answer.id,
      isCorrect: answer.isCorrect,
      description: answer.description,
      videoKey: answer.videoKey,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    };
  }

  static toDomain(data: RawAnswer): Answer {
    return new Answer({
      id: data.id,
      description: data.description,
      videoKey: data.videoKey,
      isCorrect: data.isCorrect,
      questionId: data.questionId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  static toHttp(data: Answer) {
    return {
      id: data.id,
      description: data.description,
      isCorrect: data.isCorrect,
      questionId: data.questionId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toSummaryHttp(data: Answer) {
    return {
      id: data.id,
      description: data.description,
    };
  }
}
