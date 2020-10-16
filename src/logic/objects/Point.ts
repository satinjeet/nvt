import { toTwoDecPlaces } from "../utils/number";
import { addToStage } from "../../ui/canvas";

const { abs, round, sqrt, pow } = Math;

export class Point {
  constructor(
    private x: number,
    private y: number,
    private type: "intersection" | "regular" = "regular"
  ) {
    addToStage(this);
  }

  get X(): number { return this.x }
  get Y(): number { return this.y }
  get Type(): "intersection" | "regular" { return this.type }
  
  distanceTo(pt: Point) {

    const distance = sqrt(
      pow(this.x - pt.X, 2) +
      pow(this.Y - pt.Y, 2)
    );

    return toTwoDecPlaces(distance);
  }

  toString() {
    return `Point[x: ${this.X}, y: ${this.Y}]`
  }
}