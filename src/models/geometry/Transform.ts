import { Vector } from './Vector';

export interface Transform {
  transform(vec: Vector): Vector;
  inverse(vec: Vector): Vector;
}

export class ComposeTransform {
  public local: BasicTransform;
  public inner: Transform;

  transform(vec: Vector): Vector {
    return this.inner.transform(this.local.transform(vec));
  }

  inverse(vec: Vector): Vector {
    return this.local.inverse(this.inner.inverse(vec));
  }
}

export class BasicTransform {
  public translate: Vector = new Vector(0, 0);
  public scale: Vector = new Vector(1, 1);
  public rotate: number = 0;

  transform(vec: Vector): Vector {
    return new Vector(
      this.scale.x * vec.x + this.translate.x,
      this.scale.y * vec.y + this.translate.y
    );
  }

  inverse(vec: Vector): Vector {
    return new Vector(
      (vec.x - this.translate.x) / this.scale.x,
      (vec.y - this.translate.y) / this.scale.y
    );
  }
}
