import { Rectangle } from "./objects/Rectangle";
import { Point } from "./objects/Point";
import { POINT_ON_EDGE_INDICATORS } from "./objects/enums";
import { find_intersection } from "./utils/edge";
import { addToStage } from "../ui/canvas";

const { ON_EDGE, ON_SAME_SLOPE, ON_VERTEX } = POINT_ON_EDGE_INDICATORS;

export function doRectanglesIntersect(r1: Rectangle, r2: Rectangle): boolean | Array<Point> {

  if (rectContains(r1, r2)) {
    return [];
  }

  if (areRectanglesAdjacent(r1, r2)) {
    return [];
  }

  const intersections = [];

  for (let edgeR1 of [r1.EAB, r1.EBC, r1.ECD, r1.EDA]) {
    for (let edgeR2 of [r2.EAB, r2.EBC, r2.ECD, r2.EDA]) {
      const intersection = find_intersection(edgeR1[0], edgeR1[1], edgeR2[0], edgeR2[1]);
      if (intersection) {
        intersections.push(intersection);
        addToStage(intersection);
      }    
    }
  }

  return intersections;
}

export function rectContains(r1: Rectangle, r2: Rectangle) {
  const { A: A1, B: B1, C: C1, D: D1 } = r1;
  const { A: A2, B: B2, C: C2, D: D2 } = r2;
  
  // From R1's view
  if (
    ( r1.containsPoint(A2) || (r1.onEdge(A2) == ON_EDGE || r1.onEdge(A2) == ON_VERTEX) ) &&
    ( r1.containsPoint(B2) || (r1.onEdge(B2) == ON_EDGE || r1.onEdge(B2) == ON_VERTEX) ) &&
    ( r1.containsPoint(C2) || (r1.onEdge(C2) == ON_EDGE || r1.onEdge(C2) == ON_VERTEX) ) &&
    ( r1.containsPoint(D2) || (r1.onEdge(D2) == ON_EDGE || r1.onEdge(D2) == ON_VERTEX) )
  ) {
    return true;
  }

  // From R2's view
  if (
    ( r2.containsPoint(A1) || (r2.onEdge(A1) == ON_EDGE || r2.onEdge(A1) == ON_VERTEX) ) &&
    ( r2.containsPoint(B1) || (r2.onEdge(B1) == ON_EDGE || r2.onEdge(B1) == ON_VERTEX) ) &&
    ( r2.containsPoint(C1) || (r2.onEdge(C1) == ON_EDGE || r2.onEdge(C1) == ON_VERTEX) ) &&
    ( r2.containsPoint(D1) || (r2.onEdge(D1) == ON_EDGE || r2.onEdge(D1) == ON_VERTEX) )
  ) {
    return true;
  }

  return false;
}

export function areRectanglesAdjacent(r1: Rectangle, r2: Rectangle): boolean | string {

  const { A, B, C, D } = r2;
  const points_status = [
    { slopeStatus: r1.onEdge(A), pt: A},
    { slopeStatus: r1.onEdge(B), pt: B},
    { slopeStatus: r1.onEdge(C), pt: C},
    { slopeStatus: r1.onEdge(D), pt: D},
  ];

  const pointsOnSlope = points_status.filter(({ slopeStatus: _ }) => _ == ON_EDGE || _ == ON_SAME_SLOPE || _ == ON_VERTEX);

  // To fullfill this condition, there should be only two points on a slope.
  if (pointsOnSlope.length >= 2) {
    if (pointsOnSlope.filter(({ slopeStatus: _ }) => _ == ON_EDGE).length == 2) {
      return 'subline';
    }

    if (pointsOnSlope.filter(({ slopeStatus: _ }) => _ == ON_VERTEX).length == 2) {
      return 'proper';
    }

    if (
      pointsOnSlope.filter(({ slopeStatus: _ }) => _ == ON_SAME_SLOPE).length >= 1 ||
      pointsOnSlope.filter(({ slopeStatus: _ }) => _ == ON_EDGE).length >= 1
    ) {
      return 'partial';
    }
  }

  return false;
}