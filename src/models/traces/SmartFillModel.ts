import { Edge, EdgeIntersection } from '@models/geometry/Edge';
import { EdgeCollection } from '@models/geometry/EdgeCollection';

import { Vector } from '@models/geometry/Vector';
import { TraceModel } from '@models/traces/TraceModel';

export class SmartFillModel implements TraceModel {
  private center: Vector;

  get renderDefinition(): string {
    return this.inner.renderDefinition;
  }
  get pathDefinitions(): Array<string> {
    return this.inner.pathDefinitions;
  }

  get raw(): Array<Array<Vector>> {
    return this.inner.raw;
  }

  constructor(
    private readonly inner: TraceModel,
    private readonly edges: EdgeCollection
  ) {}

  startTrace(logicPos: Vector): void {
    this.center = logicPos;
    this.inner.startTrace(logicPos);
  }

  trace(logicPos: Vector): void {
    const newPos = this.filter(logicPos);
    this.inner.trace(newPos);
  }

  private filter(target: Vector): Vector {
    var ret = target;
    var ray = new Edge(this.center, target);
    return this.edges.getHit(ray);
  }
}
