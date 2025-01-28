import { Entity } from '../entities/entity';

export type HttpMapper<Domain extends Entity> =
  Partial<Record<Exclude<keyof Domain, 'props' | 'onUpdated'>, any>>;
