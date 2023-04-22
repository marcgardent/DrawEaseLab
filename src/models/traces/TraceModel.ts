import { Vector } from '@models/geometry/Vector';

export interface RasterImage {
  stringUrl: string;
  width: number;
  height: number;
}

export interface TraceModel {
  startTrace(logicPos: Vector): void;
  trace(logicPos: Vector): void;

  readonly renderDefinition: string;
  readonly pathDefinitions: Array<string>;
  readonly raw: Array<Array<Vector>>;
  rasterImage: RasterImage;
}
