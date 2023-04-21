import { PassModel } from '@models/traces/PassModel';
import { BasicTransform, Transform } from '@models/geometry/Transform';
import { Vector } from '@models/geometry/Vector';
import { EdgeCollectorModel } from '@models/traces/EdgeCollectorModel';
import { TraceModel } from '@models/traces/TraceModel';
import { SnapGridModel } from '@models/traces/SnapGridModel';
import { SmartFillModel } from '@models/traces/SmartFillModel';
import { LengthFilterTraceModel } from '@models/traces/LengthFilterTraceModel';

import { EdgeTree } from './geometry/EdgeTree';

export class ObjectModel {
  public transform: BasicTransform = new BasicTransform();
  public passes: Array<TraceModel>;
  private activePassIndex: number = 0;
  private edges = new EdgeTree(); // EdgeTree

  public constructor() {
    this.passes = new Array<PassModel>();

    const ink = new SnapGridModel(
      new LengthFilterTraceModel(
        new EdgeCollectorModel(new PassModel('ink-pass'), this.edges)
      )
    );

    const val = new LengthFilterTraceModel(new PassModel('value-pass'));
    const col = new SmartFillModel(
      new LengthFilterTraceModel(new PassModel('color-pass')),
      this.edges
    );

    const draft = new LengthFilterTraceModel(new PassModel('draft-pass'));

    this.passes.unshift(ink);
    this.passes.unshift(val);
    this.passes.unshift(col);
    this.passes.unshift(draft);
  }

  public get activePass() {
    return this.passes[this.activePassIndex];
  }

  public selectPass(index: number) {
    this.activePassIndex = index;
  }

  public trace(pos: Vector): void {
    this.activePass.trace(pos);
  }

  public startTrace(pos: Vector): void {
    this.activePass.startTrace(pos);
  }
}
