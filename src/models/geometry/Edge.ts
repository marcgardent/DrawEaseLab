import { Vector } from '@models/geometry/Vector';

export class EdgeIntersection {
  private readonly dx1: number;
  private readonly dy1: number;
  private readonly dx2: number;
  private readonly dy2: number;

  private readonly cross1: number;
  private readonly cross2: number;
  private readonly cross3: number;
  private readonly cross4: number;

  public readonly hasIntersection: boolean;

  constructor(public readonly self: Edge, public readonly other: Edge) {
    // Cas particuliers : si les segments ont un point en commun,
    // alors ils ne s'intersectent pas.
    if (
      self.begin.equals(other.begin) ||
      self.begin.equals(other.end) ||
      self.end.equals(other.begin) ||
      self.end.equals(other.end)
    ) {
      this.hasIntersection = false;
      return;
    }

    // Calcul des vecteurs directionnels pour les deux segments
    this.dx1 = self.end.x - self.begin.x;
    this.dy1 = self.end.y - self.begin.y;
    this.dx2 = other.end.x - other.begin.x;
    this.dy2 = other.end.y - other.begin.y;

    // Calcul des vecteurs directionnels pour les deux segments
    this.cross1 =
      this.dx1 * (other.begin.y - self.begin.y) -
      this.dy1 * (other.begin.x - self.begin.x);
    this.cross2 =
      this.dx1 * (other.end.y - self.begin.y) -
      this.dy1 * (other.end.x - self.begin.x);
    this.cross3 =
      this.dx2 * (self.begin.y - other.begin.y) -
      this.dy2 * (self.begin.x - other.begin.x);
    this.cross4 =
      this.dx2 * (self.end.y - other.begin.y) -
      this.dy2 * (self.end.x - other.begin.x);

    // Les segments s'intersectent s'ils ont des orientations opposées
    // pour les vecteurs directionnels et que leurs projections
    // sur chaque axe se croisent (produits vectoriels ont des signes opposés)
    this.hasIntersection =
      this.cross1 * this.cross2 < 0 && this.cross3 * this.cross4 < 0;
  }

  public getIntersectionPoint(): Vector | null {
    if (this.hasIntersection) {
      // Calcul du point d'intersection (en utilisant les coefficients de paramétrisation)
      const t = this.cross3 / (this.cross3 - this.cross4);
      const x = this.other.begin.x + t * this.dx2;
      const y = this.other.begin.y + t * this.dy2;

      return new Vector(x, y);
    } else {
      return null;
    }
  }
}

export class Edge {
  constructor(public readonly begin: Vector, public readonly end: Vector) {}

  Delta(): Vector {
    return new Vector(this.end.x - this.begin.x, this.end.y - this.begin.y);
  }

  Invert(): Edge {
    return new Edge(this.end, this.begin);
  }
}
