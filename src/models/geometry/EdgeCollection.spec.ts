import { Edge } from './Edge';
import { EdgeArray } from './EdgeArray';
import { EdgeCollection } from './EdgeCollection';
import { EdgeTree } from './EdgeTree';
import { Vector } from './Vector';

function getHitTest(target: EdgeCollection) {
  target.add(new Edge(new Vector(0, 0), new Vector(2, 2)));
  target.add(new Edge(new Vector(-10, -10), new Vector(-10, -11)));

  it('bottom to top', () => {
    const actual = target.getHit(new Edge(new Vector(1, 0), new Vector(1, 2)));
    console.info(actual);
    expect(actual.x).toEqual(1);
    expect(actual.y).toEqual(1);
  });

  it('top to bottom', () => {
    const actual = target.getHit(new Edge(new Vector(1, 2), new Vector(1, 0)));
    expect(actual.x).toEqual(1);
    expect(actual.y).toEqual(1);
  });

  it('left to right', () => {
    const actual = target.getHit(new Edge(new Vector(0, 1), new Vector(2, 1)));
    expect(actual.x).toEqual(1);
    expect(actual.y).toEqual(1);
  });

  it('right to left ', () => {
    const actual = target.getHit(new Edge(new Vector(2, 1), new Vector(0, 1)));

    expect(actual.x).toEqual(1);
    expect(actual.y).toEqual(1);
  });
}

describe('EdgeArray::getHit', () => {
  getHitTest(new EdgeArray());
});

describe('EdgeTree::getHit', () => {
  getHitTest(new EdgeTree());
});
