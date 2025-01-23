import { Content } from '../../entities/content';
import { ContentRepository } from '../content-repository';
import { prismaCreateContent } from './functions/create-content';
import { prismaDeleteContent } from './functions/delete-content';
import { prismaGetContent } from './functions/get-content';
import { prismaGetContents } from './functions/get-contents';
import { prismaUpdateContent } from './functions/update-content';

export class PrismaContentRepository implements ContentRepository {

  async getContent(contentId: string): Promise<Content | null> {
    return prismaGetContent(contentId);
  }
  async createContent(content: Content): Promise<void> {
    return prismaCreateContent(content);
  }

  async updateContent(content: Content): Promise<void> {
    return prismaUpdateContent(content);
  }

  async deleteContent(contentId: string): Promise<void> {
    return prismaDeleteContent(contentId);
  }

  async getContents(chapterId: string): Promise<Content[]> {
    return prismaGetContents(chapterId);
  }
}
