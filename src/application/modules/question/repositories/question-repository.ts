import { Question } from '../entities/question';

export interface QuestionRepository {
  createQuestion(question: Question): Promise<void>
  updateQuestion(question: Question): Promise<void>
  deleteQuestion(questionId: string): Promise<void>
  getQuestions(chapterId: string): Promise<Question[]>
  getQuestion(questionId: string): Promise<Question | null>
}
