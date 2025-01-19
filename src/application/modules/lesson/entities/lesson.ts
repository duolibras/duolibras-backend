import { Entity, IEntityProps } from '@/application/shared/entities/entity';
import { MachineLearningModel } from '../../machine-learning-model/entities/machine-learning-model';

export interface LessonProps extends IEntityProps {
  name: string;
  modulesCount: number;
  chapterId: string;
  machineLearningModels: MachineLearningModel[];
}

export class Lesson extends Entity {
  readonly props: LessonProps;

  constructor(props: LessonProps) {
    super(props);
    this.props = props;
  }

  public get name(): string {
    return this.props.name;
  }


  public get modulesCount(): number {
    return this.props.modulesCount;
  }

  public get chapterId(): string {
    return this.props.chapterId;
  }

  public get machineLearningModels(): MachineLearningModel[] {
    return this.props.machineLearningModels;
  }
}
