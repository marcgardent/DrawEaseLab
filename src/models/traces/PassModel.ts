import { Vector } from '@models/geometry/Vector';
import { TraceModel } from '@models/traces/TraceModel';

export class PassModel implements TraceModel {
  public readonly renderDefinition: string;
  public readonly pathDefinitions: Array<string> = new Array();
  public readonly raw: Array<Array<Vector>> = new Array();

  constructor(renderDefinition: string) {
    this.renderDefinition = renderDefinition;
  }

  public startTrace(pos: Vector): Vector {
    this.pathDefinitions.unshift('M ' + pos.x + ' ' + pos.y);
    this.raw.unshift(new Array(pos));
    return pos;
  }

  public trace(pos: Vector): Vector {
    this.pathDefinitions[0] += 'L ' + pos.x + ' ' + pos.y;
    this.raw[0].unshift(pos);
    return pos;
  }
}
