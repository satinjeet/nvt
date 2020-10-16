import { Test_Points } from "./Point";
import { Test_Triangle_Entity } from "./Triangle";
import { Test_Rect_Containment } from "./contains";
import { Test_adjacent_rectangles } from "./adjacent";
import { Test_Intersections } from "./intersects";
import { Rectangle } from "../logic/objects/Rectangle";
import { Point } from "../logic/objects/Point";

import { h, render, Fragment } from "preact";
import { clearStage, getEntityView, changeEntityView } from "../ui/canvas";

function Test_Basic_Rectangles() {
  const rec = new Rectangle(
    new Point(50, 100),
    new Point(250, 100),
    new Point(250, 200),
    new Point(50, 200),
  )
}

function Test_Rectangle_Point_On_Edge_Detection() {
  const rec = new Rectangle(
    new Point(10, 100),
    new Point(100, 100),
    new Point(100, 150),
    new Point(10, 150),
  )

  const pt1 = new Point(50, 100);
  const pt2 = new Point(50, 125);
  const pt3 = new Point(60, 150);

  console.assert(rec.onEdge(pt1) == 1, `1. ${pt1} is not on the edge. val: ${rec.onEdge(pt1)}`);
  console.assert(rec.onEdge(pt2) == 0, `2. ${pt2} is not on the edge. val: ${rec.onEdge(pt2)}`);
  console.assert(rec.onEdge(pt3) == 1, `3. ${pt3} is not on the edge. val: ${rec.onEdge(pt3)}`);
}

function Test_Point_In_Rectangle_Detection() {
  const rec = new Rectangle(
    new Point(50, 150),
    new Point(250, 150),
    new Point(250, 200),
    new Point(50, 200),
  )

  const pt1 = new Point(100, 170);
  const pt2 = new Point(250, 175);
  const pt3 = new Point(275, 225);

  console.assert(rec.containsPoint(pt1), `1. ${pt1} is not inside the rectangle, val: ${rec.containsPoint(pt1)}`);
  console.assert(rec.containsPoint(pt2), `2. ${pt2} is not inside the rectangle, val: ${rec.containsPoint(pt2)}`);
  console.assert(rec.containsPoint(pt3) == false, `3. ${pt3} is not inside the rectangle, val: ${rec.containsPoint(pt3)}`);
}

function ListOfTests(props: { tests: Function[], default?: string | Function }) {
  return <div id="test-list">
    {
      props.tests.map((test, i) => {
        if (props.default) {
          if (props.default == test || props.default == test.name) {
            try {
              test();
            } catch (e) {
              // do nothing
            }
          }
        } else {
          try {
            test();
          } catch (e) {
            // do nothing
          }
        }

        return <a href="#" onClick={(e) => {
          e.preventDefault();
          clearStage();
          test();
        }}>{test.name}</a>
      })
    }
    <label>
      <input type="checkbox" checked={getEntityView("triangle")} onChange={(e) => {
        changeEntityView("triangle", e.currentTarget.checked);
      }}/>
      Toggle Triangles
    </label>
    <label>
      <input type="checkbox" checked={getEntityView("points")} onChange={(e) => {
        changeEntityView("points", e.currentTarget.checked);
      }}/>
      Toggle Points
    </label>
    <label>
      <input type="checkbox" checked={getEntityView("rect")} onChange={(e) => {
        changeEntityView("rect", e.currentTarget.checked);
      }}/>
      Toggle Rectangles
    </label>
    <span>Please open developer console to check for assertions</span>
  </div>
}

export function Tests(props: any) {
  return <Fragment>
    <ListOfTests
      tests={[
        Test_Points,
        Test_Triangle_Entity,
        Test_Basic_Rectangles,
        Test_Rectangle_Point_On_Edge_Detection,
        Test_Point_In_Rectangle_Detection,
        Test_Intersections,
        Test_adjacent_rectangles,
        Test_Rect_Containment
      ]}
      default={'Test_Intersections'}
    />
  </Fragment>
}