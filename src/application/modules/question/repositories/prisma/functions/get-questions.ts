import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Question } from '../../../entities/question';
import { QuestionMapper } from '../../../mappers/question-mapper';

export async function prismaGetQuestions(lessonId: string): Promise<Question[]> {
  const questions = await prismaClient.question.findMany({
    where: {
      lessonId,
    },
    include: {
      answers: true,
    },
    orderBy: {
      id: 'asc',
    }
  });

  return questions.map(QuestionMapper.toDomain);
}
