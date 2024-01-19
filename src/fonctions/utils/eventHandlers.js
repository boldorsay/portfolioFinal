import { addHoverTitre } from "../AddHoverTitre";
import { CheckContentHoverTitre } from "../utils/CheckContentHoverTitre";
import {
  toggleOtherDivs,
  deleteSwiper,
  changeNameTitreContent,
  addContentWork,
} from "./domManipulation";

let selectedDiv = null; // Variable to keep track of the selected div

let currentlyLockedProject = null;


export function handleDivClick(div, projectName, hoverEnable) {
    // Execute the logic only when shouldHandleClick is true

    event.stopPropagation(); // Stop the click event from bubbling up

    if (currentlyLockedProject && currentlyLockedProject !== div) {
      toggleLock(currentlyLockedProject, false); // Unlock the previous project
  }

  // Lock or unlock the clicked project
  toggleLock(div, currentlyLockedProject !== div);
  currentlyLockedProject = (currentlyLockedProject === div) ? null : div;

    if (selectedDiv === div) {
      selectedDiv = null; // Unlock action
    } else {
      selectedDiv = div; // Lock the clicked div
    }

    hoverEnable = !hoverEnable;

    let projectMeun = document.getElementById(projectName);
    let lockProjectBtn = projectMeun.querySelector(".LockProject .btn-lock");

    if (lockProjectBtn) {
      lockProjectBtn.classList.toggle("checked");
    }

    let audioElement = document.getElementById("clickSound");
    audioElement.play();

    toggleOtherDivs(selectedDiv, selectedDiv ? "none" : "auto");
    addHoverTitre(projectName);

  // Toggle the flag with each call

  return hoverEnable; // Return the potentially modified hoverEnable
}

export function handleDivMouseOver(div, projectName, hoverEnable) {
  event.stopPropagation(); // If you want to prevent event bubbling

  // if (!shouldHandleClick) return;
  if (!hoverEnable) return;
  document.getElementById(projectName).classList.add("hoverMeun");
  addContentWork(projectName);
  changeNameTitreContent(div, projectName);
  CheckContentHoverTitre(projectName);

  return hoverEnable;
}

export function handleDivMouseOut(projectName, hoverEnable) {
    event.stopPropagation(); // If you want to prevent event bubbling

  if (!hoverEnable) return;
  document.getElementById(projectName).classList.remove("hoverMeun");
  deleteSwiper();
  // change hoverEnable value
  return hoverEnable;
}
function toggleLock(div, shouldLock) {
  let projectMeun = document.getElementById(div.getAttribute('data-project-name'));
  let lockProjectBtn = projectMeun.querySelector(".LockProject .btn-lock");

  if (lockProjectBtn) {
      if (shouldLock) {
          lockProjectBtn.classList.add("checked");
      } else {
          lockProjectBtn.classList.remove("checked");
      }
  }
}
