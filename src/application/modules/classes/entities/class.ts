import { Entity, IEntityProps } from '@/application/shared/entities/entity';
import { makeStorageProvider } from '@/application/shared/providers/storage-provider/make-storage-provider';
import { GeneratePresignedPostResult } from '@/application/shared/providers/storage-provider/storage-provider';

export interface IClassProps extends IEntityProps {
  name: string;
  description: string;
  courseId: string;
  teacherId: string;
  archived: boolean;
  bannerKey?: string | null;
  videoKey?: string | null;
  bannerUrl?: string | null;
  videoUrl?: string | null;
  presignedPost: {
    banner?: GeneratePresignedPostResult;
    video?: GeneratePresignedPostResult;
  };
}

export class Class extends Entity {
  readonly props: IClassProps;

  constructor(props: IClassProps) {
    super(props);
    this.props = props;
  }

  public get name(): string {
    return this.props.name;
  }

  public get description(): string {
    return this.props.description;
  }

  public get courseId(): string {
    return this.props.courseId;
  }

  public get teacherId(): string {
    return this.props.teacherId;
  }

  public get archived(): boolean {
    return this.props.archived;
  }

  public get bannerKey(): string | null {
    return this.props.bannerKey ?? null;
  }

  public get videoKey(): string | null {
    return this.props.videoKey ?? null;
  }

  public get bannerUrl(): string | null {
    return this.props.bannerUrl ?? null;
  }

  public get videoUrl(): string | null {
    return this.props.videoUrl ?? null;
  }

  public get bannerPresignedPost(): GeneratePresignedPostResult | null {
    return this.props.presignedPost.banner ?? null;
  }

  public get videoPresignedPost(): GeneratePresignedPostResult | null {
    return this.props.presignedPost.video ?? null;
  }

  public async generatePresignedUrl(props: { banner?: boolean, video?: boolean }) {
    const storageProvider = makeStorageProvider();

    if (this.bannerKey) {
      this.props.bannerUrl = props.banner ? await storageProvider.generatePresignedUrl(this.bannerKey, 86400) : null;
    }

    if (this.videoKey) {
      this.props.videoUrl = props.video ? await storageProvider.generatePresignedUrl(this.videoKey, 86400, true) : null;
    }
  }
}
