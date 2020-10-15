import { h, render, Fragment } from "preact";
import { useEffect } from "preact/hooks";
import { Rectangle } from "../logic/objects/Rectangle";
import { Point } from "../logic/objects/Point";
import { Triangle } from "../logic/objects/Triangle";

let stage: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

let objects: Array<Rectangle | Point | Triangle> = [];

export function addToStage(object: Rectangle | Point | Triangle ) {
  objects.push(object);
}

export function clearStage() {
  objects = [];
}

export function draw() {
  window.requestAnimationFrame(draw);

  if (!context) return;

  context.clearRect(0, 0, stage.width, stage.height);
  for (let o of objects) {
    if (o instanceof Triangle) { 
      const { A, B, C } = o;
      context.save();
      context.beginPath();
      context.globalAlpha = 0.1;
      context.strokeStyle = '#FF0000';
      context.moveTo(A.X, A.Y);
      context.lineTo(B.X, B.Y);
      context.moveTo(B.X, B.Y);
      context.lineTo(C.X, C.Y);
      context.moveTo(C.X, C.Y);
      context.lineTo(A.X, A.Y);
      context.stroke();
      context.closePath();
      context.restore();
    }
    
    if (o instanceof Rectangle) {
      const { A, B, C, D } = o;
      context.beginPath();
      context.strokeStyle = '#000000';
      context.moveTo(A.X, A.Y);
      context.lineTo(B.X, B.Y);
      context.moveTo(B.X, B.Y);
      context.lineTo(C.X, C.Y);
      context.moveTo(C.X, C.Y);
      context.lineTo(D.X, D.Y);
      context.moveTo(D.X, D.Y);
      context.lineTo(A.X, A.Y);
      context.stroke();
      context.closePath();
    }

    if (o instanceof Point) {
      context.beginPath();
      context.arc(o.X, o.Y, 2, 0, 2 * Math.PI);
      // context.fillText(o.toString(), o.X - 5, o.Y - 5);
      context.fill();
      context.closePath();
    }
  }
}

export function getContext() {
  return context;
}

export function Stage(props: any) {
  useEffect(() => {
    window.requestAnimationFrame(draw);
    stage = document.querySelector('canvas#stage') as HTMLCanvasElement;
    context = stage.getContext('2d') as CanvasRenderingContext2D;
    
    stage.width = window.innerWidth;
    stage.height = window.innerHeight;
  }, [])

  return <Fragment></Fragment>
}

// export function prepareStage() {
//   window.requestAnimationFrame(draw);
//   render(<Stage />, document.body);
// }