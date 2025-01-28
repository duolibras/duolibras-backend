import { Class } from '../entities/class';

export interface ClassRepository {
  createClass(data: Class): Promise<void>;
  updateClass(data: Class): Promise<void>;
  getClass(classId: string, accountId: string): Promise<Class | null>;
  getClasses(courseId: string, accountId: string): Promise<Class[]>;
  deleteClass(classId: string): Promise<void>;

  archiveClass(courseId: string): Promise<void>;
  unarchiveClass(courseId: string): Promise<void>;
}
