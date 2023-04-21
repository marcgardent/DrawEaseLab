import { Edge } from '@models/geometry/Edge';
import { EdgeCollection } from '@models/geometry/EdgeCollection';
import { Vector } from '@models/geometry/Vector';
import { TraceModel } from '@models/traces/TraceModel';
import { Subject } from 'rxjs';

export class EdgeCollectorModel implements TraceModel {
  constructor(
    private readonly inner: TraceModel,
    private readonly data: EdgeCollection
  ) {}

  get renderDefinition(): string {
    return this.inner.renderDefinition;
  }

  get pathDefinitions(): Array<string> {
    return this.inner.pathDefinitions;
  }

  get raw(): Array<Array<Vector>> {
    return this.inner.raw;
  }

  startTrace(logicPos: Vector): void {
    this.inner.startTrace(logicPos);
  }

  trace(logicPos: Vector): void {
    const begin = this.inner.raw[0][0];
    this.data.add(new Edge(begin, logicPos));
    this.inner.trace(logicPos);
  }
}
