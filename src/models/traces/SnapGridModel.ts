import { Vector } from '@models/geometry/Vector';
import { RasterImage, TraceModel } from '@models/traces/TraceModel';

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

  get rasterImage(): RasterImage {
    return this.inner.rasterImage;
  }

  set rasterImage(v: RasterImage) {
    this.inner.rasterImage = v;
  }

  startTrace(logicPos: Vector): void {
    this.inner.startTrace(logicPos.round());
  }

  trace(logicPos: Vector): void {
    this.inner.trace(logicPos.round());
  }
}
