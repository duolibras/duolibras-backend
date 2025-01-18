import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Question } from '../../../entities/question';
import { QuestionMapper } from '../../../mappers/question-mapper';

export async function prismaUpdateQuestion(question: Question) {
  const updatedData = QuestionMapper.toPersistence(question);
  delete updatedData.module;

  await prismaClient.question.update({
    where: { id: question.id },
    data: updatedData,
  });
}
