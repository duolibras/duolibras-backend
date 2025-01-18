import { Prisma, Answer as RawAnswer, Question as RawQuestion } from '@prisma/client';
import { AnswerMapper } from '../../answer/mappers/answer-mapper';
import { Question, QuestionType } from '../entities/question';


export class QuestionMapper {
  static toPersistence(question: Question): Prisma.QuestionCreateInput {
    return {
      id: question.id,
      name: question.name,
      description: question.description,
      videoUrl: question.videoUrl,
      type: question.type,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
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
      videoUrl: data.videoUrl,
      type: data.type as QuestionType,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      answers: data.answers.map(AnswerMapper.toDomain),
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
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toSummaryHttp(data: Question) {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      videoUrl: data.videoUrl,
      type: data.type,
      lessonId: data.lessonId,
      answers: data.answers.map(AnswerMapper.toSummaryHttp),
    };
  }
}
