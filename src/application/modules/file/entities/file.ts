import { Entity, IEntityProps } from '@/application/shared/entities/entity';
import { GeneratePresignedPostResult } from '@/application/shared/providers/storage-provider/storage-provider';

export enum FileStatus {
  PENDING = 'PENDING',
  UPLOADED = 'UPLOADED'
}

export interface IFileProps extends IEntityProps {
  fileKey: string;
  status: FileStatus;
  presignedPost?: GeneratePresignedPostResult;
}

export class File extends Entity {
  readonly props: IFileProps;

  constructor(props: IFileProps) {
    super(props);
    this.props = props;
  }

  public get fileKey(): string {
    return this.props.fileKey;
  }

  public get status(): FileStatus {
    return this.props.status;
  }

  public get presignedPost(): GeneratePresignedPostResult | null {
    return this.props.presignedPost ?? null;
  }
}
