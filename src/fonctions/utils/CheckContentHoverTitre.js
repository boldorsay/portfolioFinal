import { projectJSON } from "../../JSON/ProjectsJSON";

export function CheckContentHoverTitre(projectName) {
  const project = projectJSON.find((p) => p.nameProject === projectName);
  let redirectionP = document.getElementById("redirection").children[0];

  if (project.hover.redirection == "") {
    redirectionP.classList.remove("redirectionTrue");
    redirectionP.classList.add("redirectionFalse");
  } else {
    redirectionP.classList.remove("redirectionFalse");
    redirectionP.classList.add("redirectionTrue");
  }
}
