export class Vector {
  constructor(public readonly x: number = 0, public readonly y: number = 0) {}

  public add(dx: number, dy: number): Vector {
    return new Vector(this.x + dx, this.y + dy);
  }

  public scale(factor: number): Vector {
    return new Vector(this.x * factor, this.y * factor);
  }

  public round(): Vector {
    return new Vector(Math.round(this.x), Math.round(this.y));
  }

  public equals(other: Vector): boolean {
    return this.x === other.x && this.y === other.y;
  }

  public magnitudeSquared(): number {
    return this.x * this.x + this.y * this.y;
  }
}
