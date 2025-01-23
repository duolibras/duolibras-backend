import { Answer } from '../entities/answer';

export interface AnswerRepository {
  createAnswer(answer: Answer): Promise<void>
  updateAnswer(answer: Answer): Promise<void>
  deleteAnswer(answerId: string): Promise<void>
  getAnswers(questionId: string): Promise<Answer[]>
  getAnswer(answerId: string): Promise<Answer | null>
}
