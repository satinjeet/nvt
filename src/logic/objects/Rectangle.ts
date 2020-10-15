import { Point } from "./Point";
import { toTwoDecPlaces } from "../utils/number";
import { Triangle } from "./Triangle";
import { getContext, addToStage } from "../../ui/canvas";
import { POINT_ON_EDGE_INDICATORS } from "./enums";

export class Rectangle {
  constructor(
    private a: Point,
    private b: Point,
    private c: Point,
    private d: Point
  ) {
    this.validate();

    addToStage(this);
  }

  get A(): Point { return this.a; }
  get B(): Point { return this.b; }
  get C(): Point { return this.c; }
  get D(): Point { return this.d; }

  get EAB(): Point[] { return [this.A, this.B] }
  get EBC(): Point[] { return [this.B, this.C] }
  get ECD(): Point[] { return [this.C, this.D] }
  get EDA(): Point[] { return [this.D, this.A] }

  get AB(): number { return this.a.distanceTo(this.b); }
  get BC(): number { return this.b.distanceTo(this.c); }
  get CD(): number { return this.c.distanceTo(this.d); }
  get DA(): number { return this.d.distanceTo(this.a); }

  get Area(): number {
    return this.AB * this.BC;
  }

  toString() {
    const { A, B, C, D } = this;
    return `Rect[
  ${A}
  ${B}
  ${C}
  ${D}
]`;
  }

  private validate(): void {
    const { B, D, AB, BC, CD, DA } = this;

    const BD = B.distanceTo(D);

    const expectedBDfromBCD = toTwoDecPlaces(Math.sqrt(BC * BC + CD * CD));
    const expectedBDfromDAB = toTwoDecPlaces(Math.sqrt(DA * DA + AB * AB));
    
    if (
      expectedBDfromBCD === expectedBDfromBCD &&
      expectedBDfromBCD === BD &&
      expectedBDfromDAB === BD
    ) {
      // do nothing
      return
    } else {
      throw new Error('the co-ordinates do not form a valid rectangle')
    }
  }

  private createTrianglesFromPoint(pt: Point): Array<Triangle> {
    const { A, B, C, D } = this;
    const triangles = [
      new Triangle(pt, A, B),
      new Triangle(pt, B, C),
      new Triangle(pt, C, D),
      new Triangle(pt, D, A),
    ];

    return triangles;
  }

  onEdge(pt: Point): POINT_ON_EDGE_INDICATORS {
    const triangles = this.createTrianglesFromPoint(pt);
    // If any of the triangles has 0 area, that means the point is on edge
    const zeroArea = triangles.filter(_ => _.Area == 0);
    let totalArea = 0;

    for (let triangle of triangles) { totalArea += triangle.Area }
    const area = Math.round(this.Area);
          totalArea = Math.round(totalArea);

    if (zeroArea.length > 0) {
      // Point is linear but not on any edge
      if (area < totalArea) {
        return POINT_ON_EDGE_INDICATORS.ON_SAME_SLOPE;
      } else if (zeroArea.length == 2) {
        return POINT_ON_EDGE_INDICATORS.ON_VERTEX;
      } else {
        return POINT_ON_EDGE_INDICATORS.ON_EDGE;
      }
    };

    return POINT_ON_EDGE_INDICATORS.NOT_ON_EDGE;
  }

  containsPoint(pt: Point): boolean {
    const triangles = this.createTrianglesFromPoint(pt);
    let totalArea = 0;

    for (let triangle of triangles) { totalArea += triangle.Area }

    if (Math.round(this.Area) != Math.round(totalArea)) {
      return false;
    }

    return true;
  }
}