import { h, render, Fragment } from "preact";
import { useEffect } from "preact/hooks";
import { Rectangle } from "../logic/objects/Rectangle";
import { Point } from "../logic/objects/Point";
import { Triangle } from "../logic/objects/Triangle";

let stage: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let objects: Array<Rectangle | Point | Triangle> = [];

const showObjects = {
  triangle: false,
  points: true,
  rect: true
}

export function changeEntityView(entity: 'triangle' | 'points' | 'rect', status: boolean) {
  showObjects[entity] = status;
}

export function getEntityView(entity: 'triangle' | 'points' | 'rect') {
  return showObjects[entity];
}


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

      if (!showObjects.triangle) {
        continue
      }

      const { A, B, C } = o;
      context.save();
      context.beginPath();
      context.globalAlpha = 0.5;
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
      if (!showObjects.rect) {
        continue
      }
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
      if (!showObjects.points) {
        continue
      }
      context.save();
      context.beginPath();
      context.arc(o.X, o.Y, 2, 0, 2 * Math.PI);
      if (o.Type == "intersection") context.fillStyle = '#ff0000';
      context.fill();
      context.closePath();
      context.restore();
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