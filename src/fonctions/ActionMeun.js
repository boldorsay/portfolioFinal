import {
  handleDivClick,
  handleDivMouseOver,
  handleDivMouseOut,
} from "./utils/eventHandlers";

let hoverEnable = true;

export function AddActionMeun(div, projectName) {
  let div1 = document.querySelector('.div1');
  div.addEventListener(
    "click",
    () => (hoverEnable = handleDivClick(div, projectName, hoverEnable))
  );

  div.addEventListener(
    "mouseover",
    () => (hoverEnable = handleDivMouseOver(div, projectName, hoverEnable))
  );

  div.addEventListener(
    "mouseout",
    () => (hoverEnable = handleDivMouseOut(projectName, hoverEnable))
  );




}