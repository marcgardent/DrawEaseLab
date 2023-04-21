import { Vector } from '@models/geometry/Vector';
import { TraceModel } from '@models/traces/TraceModel';

export class SnapGridModel implements TraceModel {
  constructor(private readonly inner: TraceModel) {}

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
    this.inner.startTrace(logicPos.round());
  }

  trace(logicPos: Vector): void {
    this.inner.trace(logicPos.round());
  }
}
