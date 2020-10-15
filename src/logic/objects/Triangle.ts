import { Point } from "./Point";
import { toTwoDecPlaces } from "../utils/number";
import { addToStage } from "../../ui/canvas";

export class Triangle {
  constructor(
    private a: Point,
    private b: Point,
    private c: Point
  ) {
    addToStage(this);
  }

  get A(): Point { return this.a; }
  get B(): Point { return this.b; }
  get C(): Point { return this.c; }
  
  get AB(): number { return this.a.distanceTo(this.b); }
  get BC(): number { return this.b.distanceTo(this.c); }
  get CA(): number { return this.c.distanceTo(this.a); }

  get Area(): number {
    const  { AB, BC, CA } = this;
    const semi = (AB + BC + CA) * 0.5;

    const area = Math.sqrt(
      semi
      * (semi - AB)
      * (semi - BC)
      * (semi - CA)
    )
    return toTwoDecPlaces(area);
  };

  toString() {
    return `Triangle[
      A: ${this.A},
      B: ${this.B},
      C: ${this.C}
]`;
  }
}