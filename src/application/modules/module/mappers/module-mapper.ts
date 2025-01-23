import { Module as RawModule } from '@prisma/client';
import { Module, ModuleType } from '../entities/module';

export class ModuleMapper {
  static toDomain(data: RawModule): Module {
    return new Module({
      id: data.id,
      lessonId: data.lessonId,
      type: data.type as ModuleType,
      contentId: data.contentId,
      questionId: data.questionId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  static toHttp(data: Module) {
    const http = {
      id: data.id,
      type: data.type,
      lessonId: data.lessonId,
      contentId: data.contentId,
      questionId: data.questionId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    } as any;

    data.type === ModuleType.CONTENT
      ? delete http.questionId
      : delete http.contentId;

    return http;
  }

  static toSummaryHttp(data: Module) {
    const http = {
      type: data.type,
      contentId: data.contentId,
      questionId: data.questionId,
    } as any;

    data.type === ModuleType.CONTENT
      ? delete http.questionId
      : delete http.contentId;

    return http;
  }
}
