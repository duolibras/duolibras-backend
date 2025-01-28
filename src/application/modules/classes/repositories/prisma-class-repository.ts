import { Class } from '../entities/class';
import { ClassRepository } from './class-repository';
import { prismaArchiveClass } from './functions/archive-class';
import { prismaCreateClass } from './functions/create-class';
import { prismaDeleteClass } from './functions/delete-class';
import { prismaGetClass } from './functions/get-class';
import { prismaGetClasses } from './functions/get-classes';
import { prismaUnarchiveClass } from './functions/unarchive-class';
import { prismaUpdateClass } from './functions/update-class';

export class PrismaClassRepository implements ClassRepository {
  async createClass(data: Class): Promise<void> {
    await prismaCreateClass(data);
  }

  async updateClass(data: Class): Promise<void> {
    await prismaUpdateClass(data);
  }

  async getClass(classId: string, accountId: string): Promise<Class | null> {
    return prismaGetClass(classId, accountId);
  }

  async getClasses(courseId: string, accountId: string): Promise<Class[]> {
    return prismaGetClasses(courseId, accountId);
  }

  async deleteClass(classId: string): Promise<void> {
    await prismaDeleteClass(classId);
  }

  async archiveClass(classId: string): Promise<void> {
    await prismaArchiveClass(classId);
  }

  async unarchiveClass(classId: string): Promise<void> {
    await prismaUnarchiveClass(classId);
  }
}
