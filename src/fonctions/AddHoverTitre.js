import { projectJSON } from "../JSON/ProjectsJSON";

// let hoverEnable = true;

export function addHoverTitre(nameProject) {
  document.querySelectorAll(".flex-items").forEach(function (item) {
    item.addEventListener("mouseover", function () {
      // Remove existing hoverDiv if any
      removeExistingHoverDiv();

      // Create a new hoverDiv
      const hoverDiv = createHoverDiv(item, nameProject);
      document.querySelector(".div2").appendChild(hoverDiv);
    });

    item.addEventListener("mouseout", function () {
      removeExistingHoverDiv();
    });
  });
}

function removeExistingHoverDiv() {
  const existingHoverDiv = document.querySelector(".hoverDiv");
  if (existingHoverDiv) {
    existingHoverDiv.remove();
  }
}
function createHoverDiv(item, nameProject) {
  const project = projectJSON.find((p) => p.nameProject === nameProject);
  let link = project.hover.redirection;
  let text = project.hover.info;
  let titreName = project.hover.titreName;

  const hoverDiv = document.createElement("div");
  hoverDiv.classList.add("hoverDiv");
  let titre = document.createElement("h3");
  titre.classList.add("hoverTitre");

  switch (item.id) {
    case "Credit":
      hoverDiv.textContent = "n/a";
      break;
    case "info":
      titre.textContent = titreName;
      hoverDiv.appendChild(titre);

      // Create a text node for the project hover info
      let BaliseP = document.createElement("p");
      BaliseP.classList.add("hoverTitre");

      BaliseP.innerHTML += text;
      hoverDiv.appendChild(BaliseP);

      break;
    case "redirection":
      hoverDiv.classList.remove("hoverDiv");
      item.addEventListener("click", () => {
        console.log(project.hover.redirection);
        if (link === "") {
          console.log("cacacacac");
          return;
        }
        window.open(link, "_blank");

      });
      break;
    default:
      hoverDiv.textContent = "Default text content";
  }

  return hoverDiv;
}
