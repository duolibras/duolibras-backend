import { Prisma, Answer as RawAnswer, Question as RawQuestion } from '@prisma/client';
import { AnswerMapper } from '../../answer/mappers/answer-mapper';
import { Question, QuestionType } from '../entities/question';


export class QuestionMapper {
  static toPersistence(question: Question): Prisma.QuestionCreateInput {
    return {
      id: question.id,
      name: question.name,
      description: question.description,
      videoKey: question.videoKey,
      type: question.type,
      answer: question.answer,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
      machineLearningModel: question.machineLearningModelId ? {
        connect: {
          id: question.machineLearningModelId,
        },
      } : undefined,
      answers: {
        createMany: {
          data: question.answers.map(AnswerMapper.toQuestionPersistence)
        },
      },
      lesson: {
        connect: {
          id: question.lessonId,
        }
      },
      module: {
        connectOrCreate: {
          create: {
            id: question.module.id,
            type: question.module.type,
            lessonId: question.lessonId,
            createdAt: question.createdAt,
            updatedAt: question.updatedAt,
          },
          where: {
            id: question.module.id,
          }
        }
      }
    };
  }

  static toDomain(data: RawQuestion & { answers: RawAnswer[] }): Question {
    return new Question({
      id: data.id,
      name: data.name,
      description: data.description,
      lessonId: data.lessonId,
      videoKey: data.videoKey,
      answer: data.answer,
      type: data.type as QuestionType,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      answers: data.answers.map(AnswerMapper.toDomain),
      machineLearningModelId: data.machineLearningModelId,
    });
  }

  static toHttp(data: Question) {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      videoUrl: data.videoUrl,
      type: data.type,
      lessonId: data.lessonId,
      answers: data.answers.map(AnswerMapper.toHttp),
      machineLearningModelId: data.machineLearningModelId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toSummaryHttp(data: Question) {
    return data.type === QuestionType.VIDEO
      ? {
        id: data.id,
        name: data.name,
        description: data.description,
        type: data.type,
        lessonId: data.lessonId,
        answer: data.answer,
        machineLearningModelId: data.machineLearningModelId,
      }
      : {
        id: data.id,
        name: data.name,
        description: data.description,
        videoUrl: data.videoUrl,
        type: data.type,
        lessonId: data.lessonId,
        answers: data.answers.map(AnswerMapper.toSummaryHttp),
        machineLearningModelId: data.machineLearningModelId,
      };

  }
}
