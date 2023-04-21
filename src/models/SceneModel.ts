import { ObjectModel } from '@models/ObjectModel';
import { Vector } from '@models/geometry/Vector';

export class SceneModel {
  public activeObject = new ObjectModel();
  private activePass = 0;

  public selectPass(index: number) {
    this.activePass = index;
    this.activeObject.selectPass(index);
  }

  public trace(pos: Vector): void {
    this.activeObject.trace(pos);
  }

  public startTrace(pos: Vector): void {
    this.activeObject.startTrace(pos);
  }
}
