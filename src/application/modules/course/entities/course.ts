import { Entity, IEntityProps } from '@/application/shared/entities/entity';
import { AWSS3StorageProvider } from '@/application/shared/providers/storage-provider/aws-s3-storage-provider';
import { File } from '../../file/entities/file';

export interface CourseProps extends IEntityProps {
  name: string;
  description: string;
  priceInCents?: number;
  preemium: boolean;
  classCount: number;
  studentsCount: number;
  archived: boolean;
  teacherId: string;
  stripeCourseId?: string | null;
  owned?: boolean;
  bannerKey?: string | null;
  videoKey?: string | null;
  bannerUrl?: string | null;
  videoUrl?: string | null;
  banner?: File | null;
  video?: File | null;
}

export class Course extends Entity {
  readonly props: CourseProps;

  constructor(props: CourseProps) {
    super(props);
    this.props = props;
    this.props.bannerUrl = props.bannerKey && AWSS3StorageProvider.generatePublicUrl(props.bannerKey);
  }

  public get name(): string {
    return this.props.name;
  }

  public get description(): string {
    return this.props.description;
  }

  public get priceInCents(): number | undefined {
    return this.props.priceInCents;
  }

  public get preemium(): boolean {
    return this.props.preemium;
  }

  public get classCount(): number {
    return this.props.classCount;
  }

  public get studentsCount(): number {
    return this.props.studentsCount;
  }

  public get teacherId(): string {
    return this.props.teacherId;
  }

  public get archived(): boolean {
    return this.props.archived;
  }

  public get owned(): boolean {
    return !!this.props.owned;
  }

  public get stripeCourseId(): string | null {
    return this.props.stripeCourseId ?? null;
  }

  public set stripeCourseId(stripeCourseId: string) {
    this.props.stripeCourseId = stripeCourseId;
  }

  public get bannerKey(): string | null {
    return this.props.bannerKey ?? null;
  }

  public set bannerKey(bannerKey: string | undefined | null) {
    if (!bannerKey) return;
    this.props.bannerKey = bannerKey;
    this.props.bannerUrl = AWSS3StorageProvider.generatePublicUrl(bannerKey);
  }

  public get videoKey(): string | null {
    return this.props.videoKey ?? null;
  }

  public get banner(): File | null {
    return this.props.banner ?? null;
  }

  public get video(): File | null {
    return this.props.video ?? null;
  }

  public set banner(file: File | null | undefined) {
    this.props.banner = file;
  }

  public set video(file: File | null | undefined) {
    this.props.video = file;
  }

  public get bannerUrl(): string | null {
    return this.props.bannerUrl ?? null;
  }

  public get videoUrl(): string | null {
    return this.props.videoUrl ?? null;
  }
}
