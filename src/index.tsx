import { Stage } from "./ui/canvas";
import { Tests } from "./tests/main";
import { h, render, Fragment } from "preact";

render(
  <Fragment>
    <Tests />
    <Stage />
  </Fragment>,
  document.body
)