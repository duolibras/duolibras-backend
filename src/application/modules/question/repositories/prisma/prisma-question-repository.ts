import { Question } from '../../entities/question';
import { QuestionRepository } from '../question-repository';
import { prismaCreateQuestion } from './functions/create-question';
import { prismaDeleteQuestion } from './functions/delete-question';
import { prismaGetQuestion } from './functions/get-question';
import { prismaGetQuestions } from './functions/get-questions';
import { prismaUpdateQuestion } from './functions/update-question';

export class PrismaQuestionRepository implements QuestionRepository {

  async getQuestion(questionId: string): Promise<Question | null> {
    return prismaGetQuestion(questionId);
  }
  async createQuestion(question: Question): Promise<void> {
    return prismaCreateQuestion(question);
  }

  async updateQuestion(question: Question): Promise<void> {
    return prismaUpdateQuestion(question);
  }

  async deleteQuestion(questionId: string): Promise<void> {
    return prismaDeleteQuestion(questionId);
  }

  async getQuestions(chapterId: string): Promise<Question[]> {
    return prismaGetQuestions(chapterId);
  }
}
