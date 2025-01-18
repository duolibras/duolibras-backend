import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Question } from '../../../entities/question';
import { QuestionMapper } from '../../../mappers/question-mapper';

export async function prismaCreateQuestion(question: Question) {
  await prismaClient.question.create({
    data: QuestionMapper.toPersistence(question),
  });
}
