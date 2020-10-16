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

  const rect5 = new Rectangle(
    new Point(300, 600),
    new Point(400, 700),
    new Point(300, 800),
    new Point(200, 700),
  );

  const rect6 = new Rectangle(
    new Point(350, 600),
    new Point(450, 700),
    new Point(350, 800),
    new Point(250, 700),
  );

  const intersections1 = doRectanglesIntersect(rec1, rec2);
  const intersections2 = doRectanglesIntersect(rec1, rec3);
  const intersections3 = doRectanglesIntersect(rect5, rect6);

  console.log(intersections1);
  console.log(intersections2);
  console.log(intersections3);

  console.assert(intersections1 instanceof Array && intersections1.length == 2, `1. Intersection between ${rec1} and ${rec2} is not a set of points, they do not intersect`);
  console.assert(intersections2 instanceof Array && intersections2.length == 2, `2. Intersection between ${rec1} and ${rec3} is not a set of points, they do not intersect`);
  console.assert(intersections3 instanceof Array && intersections3.length == 2, `3. Intersection between ${rect5} and ${rect6} is not a set of points, they do not intersect`);
}