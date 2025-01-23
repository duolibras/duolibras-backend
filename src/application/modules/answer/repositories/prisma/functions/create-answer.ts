import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Answer } from '../../../entities/answer';
import { AnswerMapper } from '../../../mappers/answer-mapper';

export async function prismaCreateAnswer(answer: Answer) {
  await prismaClient.answer.create({
    data: AnswerMapper.toPersistence(answer),
  });
}
