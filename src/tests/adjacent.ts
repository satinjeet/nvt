import { Rectangle } from "../logic/objects/Rectangle";
import { Point } from "../logic/objects/Point";
import { areRectanglesAdjacent } from "../logic/operations";

export function Test_adjacent_rectangles() {
  const rec1 = new Rectangle(
    new Point(100, 100),
    new Point(250, 100),
    new Point(250, 200),
    new Point(100, 200),
  )

  const rec2 = new Rectangle(
    new Point(250, 150),
    new Point(290, 150),
    new Point(290, 240),
    new Point(250, 240),
  )
  const rec3 = new Rectangle(
    new Point(250, 100),
    new Point(290, 100),
    new Point(290, 200),
    new Point(250, 200),
  )

  const rec4 = new Rectangle(
    new Point(100, 200),
    new Point(200, 200),
    new Point(200, 250),
    new Point(100, 250),
  )

  const rec5 = new Rectangle(
    new Point(100, 250),
    new Point(200, 250),
    new Point(200, 300),
    new Point(100, 300),
  )

  const rec6 = new Rectangle(
    new Point(120, 300),
    new Point(150, 300),
    new Point(150, 500),
    new Point(120, 500),
  )

  const rec7 = new Rectangle(
    new Point(110, 110),
    new Point(260, 110),
    new Point(260, 210),
    new Point(110, 210),
  )

  const rec8 = new Rectangle(
    new Point(500, 500),
    new Point(600, 500),
    new Point(600, 550),
    new Point(500, 550),
  )

  const result1 = areRectanglesAdjacent(rec1, rec2);
  const result2 = areRectanglesAdjacent(rec1, rec3);
  const result3 = areRectanglesAdjacent(rec1, rec4);
  const result4 = areRectanglesAdjacent(rec5, rec4);
  const result5 = areRectanglesAdjacent(rec5, rec6);
  const result6 = areRectanglesAdjacent(rec1, rec7);
  const result7 = areRectanglesAdjacent(rec1, rec8);

  console.assert(result1 == 'partial', 'Rectangles expected is ' + result1);
  console.assert(result2 == 'proper', 'Rectangles expected is ' + result2);
  console.assert(result3 == 'partial', 'Rectangles expected is ' + result3);
  console.assert(result4 == 'proper', 'Rectangles expected is ' + result4);
  console.assert(result5 == 'subline', 'Rectangles expected is ' + result5);
  console.assert(result6 == false, 'Rectangles expected is ' + result6);
  console.assert(result7 == false, 'Rectangles expected is ' + result7);

}