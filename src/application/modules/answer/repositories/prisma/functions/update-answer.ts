import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Answer } from '../../../entities/answer';
import { AnswerMapper } from '../../../mappers/answer-mapper';

export async function prismaUpdateAnswer(answer: Answer) {
  await prismaClient.answer.update({
    where: { id: answer.id },
    data: AnswerMapper.toPersistence(answer),
  });
}
