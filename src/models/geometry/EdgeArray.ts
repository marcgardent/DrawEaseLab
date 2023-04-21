import { Edge, EdgeIntersection } from './Edge';
import { EdgeCollection } from './EdgeCollection';
import { Vector } from './Vector';

/* basic implementation without indexer */
export class EdgeArray implements EdgeCollection {
  private data = new Array<Edge>();
  add(...edges: Edge[]): void {
    this.data.unshift(...edges);
  }

  remove(...edges: Edge[]): void {
    for (const e of edges) {
      const i = this.data.indexOf(e);
      this.data = this.data.filter((element) => !edges.includes(element));
    }
  }

  getHit(ray: Edge): Vector {
    var ret = ray.end;
    var lengthMin = 0;
    for (const intersect of this.getIntersections(ray)) {
      const p = new Edge(ray.begin, intersect);
      const dp = p.Delta();
      if (dp.magnitudeSquared() > lengthMin) {
        ret = intersect;
      }
    }
    return ret;
  }

  private getIntersections(ray: Edge): Vector[] {
    const ret = new Array<Vector>();
    for (const wall of this.data) {
      const intersect = new EdgeIntersection(ray, wall).getIntersectionPoint();
      if (intersect) {
        ret.push(intersect);
      }
    }
    return ret;
  }
}
