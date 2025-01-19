import { Entity, IEntityProps } from '@/application/shared/entities/entity';

export interface MachineLearningModelProps extends IEntityProps {
  name: string;
  description: string;
  weightsUrl: string;
  modelUrl: string;
  metadataUrl: string;
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

  public get weightsUrl(): string {
    return this.props.weightsUrl;
  }

  public get modelUrl(): string {
    return this.props.modelUrl;
  }

  public get metadataUrl(): string {
    return this.props.metadataUrl;
  }
}

