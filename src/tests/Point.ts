import { Point } from "../logic/objects/Point"

export function Test_Points() {
  const pt = new Point(100, 100);
  console.assert(pt.X === 100, "X value is not what is expected for the point");
  console.assert(pt.Y === 100, "Y value is not what is expected for the point");

  const pt1 = new Point(225, 220);
  const pt2 = new Point(500, 600);

  console.assert(pt1.distanceTo(pt2) === 469.07, 'Distance is actually ' + pt1.distanceTo(pt2))
}
