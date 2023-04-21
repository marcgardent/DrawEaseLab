import { Vector } from '@models/geometry/Vector';
import { TraceModel } from '@models/traces/TraceModel';

export class LengthFilterTraceModel implements TraceModel {
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

  constructor(private readonly inner: TraceModel) {}

  startTrace(logicPos: Vector): void {
    this.inner.startTrace(logicPos);
  }

  trace(logicPos: Vector): void {
    const begin = this.raw[0][0];
    const dx = logicPos.x - begin.x;
    const dy = logicPos.y - begin.y;
    const magnitudeSquared = dx * dx + dy * dy;
    if (magnitudeSquared > 2) {
      this.inner.trace(logicPos);
    }
  }
}
