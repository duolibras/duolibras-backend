import { AnswerRepository } from '@/application/modules/answer/repositories/answer-repository';
import { QuestionType } from '@/application/modules/question/entities/question';
import { QuestionRepository } from '@/application/modules/question/repositories/question-repository';
import { BadRequestHttpError } from '@/application/shared/http/errors/bad-request-http-error';
import { NotFoundHTTPError } from '@/application/shared/http/errors/not-found-http-error';
import { IUseCase } from '@/application/shared/http/interfaces/use-case';

interface IInptut {
  questionId: string;
  answerId: string;
}

type IOutput = void;

export class AnswerQuestionJourneyUseCase implements IUseCase<IInptut, IOutput> {
  constructor(
    private readonly questionsRepo: QuestionRepository,
    private readonly answerRepo: AnswerRepository,
  ) {}

  async execute({ answerId, questionId }: IInptut): Promise<void> {
    const question = await this.questionsRepo.getQuestion(questionId);

    if (!question) {
      throw new NotFoundHTTPError('Questão não encontrada');
    }

    if (question.type === QuestionType.VIDEO) {
      throw new BadRequestHttpError(
        'Essa questão não precisa de uma resposta, apenas a validação do modelo de IA no app já é suficiente'
      );
    }

    const answers = await this.answerRepo.getAnswers(questionId);

    const answer = answers.find((a) => a.id === answerId);

    if (!answer) {
      throw new NotFoundHTTPError('Essa resposta não existe nessa questão');
    }

    if (!answer.isCorrect) {
      throw new BadRequestHttpError('Resposta errada');
    }
  }
}
