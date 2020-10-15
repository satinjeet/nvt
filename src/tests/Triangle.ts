import { Triangle } from "../logic/objects/Triangle";
import { Point } from "../logic/objects/Point";

export function Test_Triangle_Entity() {
  const t1 = new Triangle(
    new Point(200,200),
    new Point(100,300),
    new Point(300,300),
  )

  console.assert(t1.Area == 0.99, "Nope, the area is " + t1.Area)

  const t2 = new Triangle(
    new Point(100, 100),
    new Point(200, 250),
    new Point(100, 250)
  );

  console.assert(t2.Area == 75, "Nope, the area is " + t2.Area)

  const t3 = new Triangle(
    new Point(100, 100),
    new Point(100, 150),
    new Point(100, 250)
  );

  console.assert(t3.Area == 0, "Nope, the area is " + t3.Area)
}
