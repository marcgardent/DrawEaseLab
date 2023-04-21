import { Edge, EdgeIntersection } from './Edge';
import { Vector } from './Vector';

export interface EdgeCollection {
  add(...edge: Edge[]): void;
  remove(...edge: Edge[]): void;

  getHit(segment: Edge): Vector;
}
