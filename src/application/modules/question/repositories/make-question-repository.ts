import { PrismaQuestionRepository } from './prisma/prisma-question-repository';
import { QuestionRepository } from './question-repository';

export function makeQuestionRepository(): QuestionRepository {
  return new PrismaQuestionRepository();
}
