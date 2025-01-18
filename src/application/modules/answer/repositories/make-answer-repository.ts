import { AnswerRepository } from './answer-repository';
import { PrismaAnswerRepository } from './prisma/prisma-answer-repository';

export function makeAnswerRepository(): AnswerRepository {
  return new PrismaAnswerRepository();
}
