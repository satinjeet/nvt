import { Point } from "../objects/Point"

export function find_intersection(A: Point, B: Point, X: Point, Y: Point) {

  const s10_x = B.X - A.X
  const s10_y = B.Y - A.Y
  const s32_x = Y.X - X.X
  const s32_y = Y.Y - X.Y
  
  const denom = s10_x * s32_y - s32_x * s10_y;
  
  if (denom == 0) {
    return null;
    // collinear
  }
  
  const denom_is_positive = denom > 0;
  
  const s02_x = A.X - X.X;
  const s02_y = A.Y - X.Y;
  
  const s_numer = s10_x * s02_y - s10_y * s02_x;
  
  if ((s_numer < 0) == denom_is_positive) {
    return null; // # no collision
  }
  
  const t_numer = s32_x * s02_y - s32_y * s02_x
  
  if ((t_numer < 0) == denom_is_positive) {
    return null; // no collision
  }
  
  if ((s_numer > denom) == denom_is_positive || (t_numer > denom) == denom_is_positive) {
    return null; // No collision
  }

  // collision detected
  
  const t = t_numer / denom;
  
  const intersection_point = new Point(
    A.X + (t * s10_x),
    A.Y + (t * s10_y),
    "intersection"
  );

  return intersection_point;
}
