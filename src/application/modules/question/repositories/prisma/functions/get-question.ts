import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Question } from '../../../entities/question';
import { QuestionMapper } from '../../../mappers/question-mapper';

export async function prismaGetQuestion(questionId: string): Promise<Question | null> {
  const question = await prismaClient.question.findUnique({
    where: { id: questionId },
    include: {
      module: true,
      answers: true,
    }
  });

  return question ? QuestionMapper.toDomain(question) : null;
}
