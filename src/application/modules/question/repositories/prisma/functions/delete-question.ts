import { prismaClient } from '@/application/shared/clients/prisma-clients';

export async function prismaDeleteQuestion(questionId: string) {
  await prismaClient.question.delete({ where: { id: questionId } });
}
