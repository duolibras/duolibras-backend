import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Answer } from '../../../entities/answer';
import { AnswerMapper } from '../../../mappers/answer-mapper';

export async function prismaGetAnswer(answerId: string): Promise<Answer | null> {
  const answer = await prismaClient.answer.findUnique({
    where: { id: answerId },
  });

  return answer ? AnswerMapper.toDomain(answer) : null;
}
