import { Answer } from '../../entities/answer';
import { AnswerRepository } from '../answer-repository';
import { prismaCreateAnswer } from './functions/create-answer';
import { prismaDeleteAnswer } from './functions/delete-answer';
import { prismaGetAnswer } from './functions/get-answer';
import { prismaGetAnswers } from './functions/get-answers';
import { prismaUpdateAnswer } from './functions/update-answer';

export class PrismaAnswerRepository implements AnswerRepository {

  async getAnswer(answerId: string): Promise<Answer | null> {
    return prismaGetAnswer(answerId);
  }
  async createAnswer(answer: Answer): Promise<void> {
    return prismaCreateAnswer(answer);
  }

  async updateAnswer(answer: Answer): Promise<void> {
    return prismaUpdateAnswer(answer);
  }

  async deleteAnswer(answerId: string): Promise<void> {
    return prismaDeleteAnswer(answerId);
  }

  async getAnswers(chapterId: string): Promise<Answer[]> {
    return prismaGetAnswers(chapterId);
  }
}
