import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { FileRepository } from './file-repository';

export class PrismaFilerepository implements FileRepository {
  async deleteFile(fileKey: string): Promise<void> {
    await prismaClient.file.delete({
      where: { fileKey }
    });
  }
}
