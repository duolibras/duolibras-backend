import { prismaClient } from '@/application/shared/clients/prisma-clients';

export async function prismaDeleteAnswer(answerId: string) {
  await prismaClient.answer.delete({ where: { id: answerId } });
}
