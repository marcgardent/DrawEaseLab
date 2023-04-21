import { Edge } from './Edge';

import { System } from 'detect-collisions';
import { Vector } from './Vector';
import { EdgeCollection } from './EdgeCollection';

/* Advanced implementation with BVH/SAT algorithms */
export class EdgeTree implements EdgeCollection {
  private readonly system = new System();

  constructor() {}

  add(...edges: Edge[]): void {
    for (const e of edges) {
      this.system.createLine(e.begin, e.end, {
        isStatic: true,
      });
    }
  }

  remove(...edges: Edge[]): void {
    // todo implement index
  }

  getHit(ray: Edge): Vector {
    const hit = this.system.raycast(ray.begin, ray.end);

    if (hit) {
      return new Vector(hit.point.x, hit.point.y);
    } else {
      return ray.end;
    }
  }
}
