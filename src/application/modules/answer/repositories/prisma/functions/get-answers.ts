import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Answer } from '../../../entities/answer';
import { AnswerMapper } from '../../../mappers/answer-mapper';

export async function prismaGetAnswers(questionId: string): Promise<Answer[]> {
  const answers = await prismaClient.answer.findMany({
    where: {
      questionId,
    },
    orderBy: {
      id: 'asc',
    }
  });

  return answers.map(AnswerMapper.toDomain);
}
