import { Content } from '../entities/content';

export interface ContentRepository {
  createContent(content: Content): Promise<void>
  updateContent(content: Content): Promise<void>
  deleteContent(contentId: string): Promise<void>
  getContents(chapterId: string): Promise<Content[]>
  getContent(contentId: string): Promise<Content | null>
}
