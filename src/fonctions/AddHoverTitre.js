import { projectJSON } from "../JSON/ProjectsJSON";

// let hoverEnable = true;
// Stocker les références des gestionnaires d'événements pour chaque item
const eventHandlers = new Map();
let link = null;
let text = null;
let titreName = null;

function onMouseOverHandler(item, nameProject) {
  removeExistingHoverDiv();
  const hoverDiv = createHoverDiv(item, nameProject);
  document.querySelector(".div2").appendChild(hoverDiv);
}

function onMouseOutHandler() {
  removeExistingHoverDiv();
}

export function addHoverTitre(nameProject) {
  document.querySelectorAll(".flex-items").forEach(function(item) {
    // Préparer les gestionnaires spécifiques à cet item
    const mouseOverHandler = () => onMouseOverHandler(item, nameProject);
    const mouseOutHandler = onMouseOutHandler;

    // Suppression des écouteurs précédents s'ils existent
    if (eventHandlers.has(item)) {
      const handlers = eventHandlers.get(item);
      item.removeEventListener("mouseover", handlers.mouseOver);
      item.removeEventListener("mouseout", handlers.mouseOut);
    }

    // Ajouter les nouveaux écouteurs
    item.addEventListener("mouseover", mouseOverHandler);
    item.addEventListener("mouseout", mouseOutHandler);

    // Mettre à jour la map avec les nouveaux gestionnaires
    eventHandlers.set(item, { mouseOver: mouseOverHandler, mouseOut: mouseOutHandler });
  });
}

function removeExistingHoverDiv() {
  const existingHoverDiv = document.querySelector(".hoverDiv");
  link = null
  text = null
  titreName = null

  console.log('1'+link)
  if (existingHoverDiv) {
    existingHoverDiv.remove();

  }
}
function createHoverDiv(item, nameProject) {
  const project = projectJSON.find((p) => p.nameProject === nameProject);
   link = project.hover.redirection;
   text = project.hover.info;
   titreName = project.hover.titreName;

   console.log(link)


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
  // Attachez l'URL directement à l'élément si ce n'est pas déjà fait
  if (!item.hasAttribute("data-redirection-url")) {
    item.setAttribute("data-redirection-url", link);
    item.addEventListener("click", () => {
      // Récupérer l'URL de redirection depuis l'attribut de l'élément
      const redirectionUrl = link
      console.log(redirectionUrl);
      if (redirectionUrl === "") {
        return;
      }
      window.open(redirectionUrl, "_blank");
    });
    item.setAttribute("data-click-attached", "true");
  }
  break;

    default:
      hoverDiv.textContent = "Default text content";
  }

  return hoverDiv;
}

