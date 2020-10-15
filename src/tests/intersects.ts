import { Rectangle } from "../logic/objects/Rectangle";
import { Point } from "../logic/objects/Point";
import { doRectanglesIntersect } from "../logic/operations";

export function Test_Intersections() {
  const rec1 = new Rectangle(
    new Point(100, 100),
    new Point(250, 100),
    new Point(250, 200),
    new Point(100, 200),
  )

  const rec2 = new Rectangle(
    new Point(190, 190),
    new Point(290, 190),
    new Point(290, 240),
    new Point(190, 240),
  )

  const rec3 = new Rectangle(
    new Point(100, 100),
    new Point(150, 100),
    new Point(150, 150),
    new Point(100, 150),
  )

  doRectanglesIntersect(rec1, rec2);
  doRectanglesIntersect(rec1, rec3);
}