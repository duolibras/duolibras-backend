import { Entity, IEntityProps } from '@/application/shared/entities/entity';
import { makeStorageProvider } from '@/application/shared/providers/storage-provider/make-storage-provider';

export interface MachineLearningModelProps extends IEntityProps {
  name: string;
  description: string;
  weightsKey: string;
  modelKey: string;
  metadataKey: string;
  weightsUrl?: string | null;
  modelUrl?: string | null;
  metadataUrl?: string | null;
}


export class MachineLearningModel extends Entity {
  readonly props: MachineLearningModelProps;

  constructor(props: MachineLearningModelProps) {
    super(props);
    this.props = props;
  }

  public get name(): string {
    return this.props.name;
  }

  public get description(): string {
    return this.props.description;
  }

  public get weightsKey(): string {
    return this.props.weightsKey;
  }

  public get modelKey(): string {
    return this.props.modelKey;
  }

  public get metadataKey(): string {
    return this.props.metadataKey;
  }

  public get weightsUrl(): string | null {
    return this.props.weightsUrl ?? null;
  }

  public get modelUrl(): string | null {
    return this.props.modelUrl ?? null;
  }

  public get metadataUrl(): string | null {
    return this.props.metadataUrl ?? null;
  }

  private set weightsUrl(value: string | null) {
    this.props.weightsUrl = value;
  }

  private set modelUrl(value: string | null) {
    this.props.modelUrl = value;
  }

  private set metadataUrl(value: string | null) {
    this.props.metadataUrl = value;
  }

  async generatePresignedUrls(): Promise<void> {
    this.props.weightsUrl = await this.generatePresignedUrl(this.props.weightsKey);
    this.props.modelUrl = await this.generatePresignedUrl(this.props.modelKey);
    this.props.metadataUrl = await this.generatePresignedUrl(this.props.metadataKey);
  }

  private async generatePresignedUrl(key: string): Promise<string | null> {
    const storageProvider = makeStorageProvider();

    return storageProvider.generatePresignedUrl(key, 3600);
  }
}

