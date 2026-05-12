import { projectJSON } from "../JSON/ProjectsJSON";

// let hoverEnable = true;
// Stocker les références des gestionnaires d'événements pour chaque item
const eventHandlers = new Map();
let link = null;
let text = null;
let titreName = null;

function shouldKeepHoverPanel(relatedTarget) {
  if (!relatedTarget || !(relatedTarget instanceof Element)) {
    return false;
  }
  return Boolean(
    relatedTarget.closest(".hoverDiv") ||
      relatedTarget.closest(".flex-items")
  );
}

function onHoverDivMouseLeave(e) {
  if (shouldKeepHoverPanel(e.relatedTarget)) {
    return;
  }
  removeExistingHoverDiv();
}

function onMouseEnterHandler(item, nameProject) {
  const existing = document.querySelector(".hoverDiv");
  if (
    existing &&
    existing.dataset.projectName === nameProject &&
    existing.dataset.sourceId === item.id
  ) {
    return;
  }
  removeExistingHoverDiv();
  const hoverDiv = createHoverDiv(item, nameProject);
  if (hoverDiv) {
    hoverDiv.dataset.projectName = nameProject;
    hoverDiv.dataset.sourceId = item.id;
    hoverDiv.addEventListener("mouseleave", onHoverDivMouseLeave);
    const host = document.querySelector(".div3");
    if (host) {
      host.appendChild(hoverDiv);
    }
  }
}

function onMouseLeaveFromFlex(e) {
  if (shouldKeepHoverPanel(e.relatedTarget)) {
    return;
  }
  removeExistingHoverDiv();
}

export function addHoverTitre(nameProject) {
  const redirectionItem = document.getElementById("redirection");
  const project = projectJSON.find((p) => p.nameProject === nameProject);
  if (redirectionItem) {
    redirectionItem.setAttribute(
      "data-redirection-url",
      project?.hover?.redirection ?? ""
    );
  }

  document.querySelectorAll(".flex-items").forEach(function(item) {
    const mouseEnterHandler = () => onMouseEnterHandler(item, nameProject);
    const mouseLeaveHandler = (ev) => onMouseLeaveFromFlex(ev);

    if (eventHandlers.has(item)) {
      const handlers = eventHandlers.get(item);
      item.removeEventListener("mouseenter", handlers.mouseEnter);
      item.removeEventListener("mouseleave", handlers.mouseLeave);
    }

    item.addEventListener("mouseenter", mouseEnterHandler);
    item.addEventListener("mouseleave", mouseLeaveHandler);

    eventHandlers.set(item, {
      mouseEnter: mouseEnterHandler,
      mouseLeave: mouseLeaveHandler,
    });
  });
}

function removeExistingHoverDiv() {
  const existingHoverDiv = document.querySelector(".hoverDiv");
  link = null;
  text = null;
  titreName = null;
  if (existingHoverDiv) {
    existingHoverDiv.remove();
  }
}
function createHoverDiv(item, nameProject) {
  const project = projectJSON.find((p) => p.nameProject === nameProject);
  if (!project || !project.hover) {
    return null;
  }
  link = project.hover.redirection;
  text = project.hover.info;
  titreName = project.hover.titreName;

  const hoverDiv = document.createElement("div");
  hoverDiv.classList.add("hoverDiv");
  let titre = document.createElement("h3");
  titre.classList.add("hoverTitre");

  switch (item.id) {
    case "Credit":
      hoverDiv.textContent = "n/a";
      return hoverDiv;
    case "info":
      titre.classList.add("hoverDiv__title");
      titre.textContent = titreName;
      hoverDiv.appendChild(titre);

      // Create a text node for the project hover info
      let BaliseP = document.createElement("p");
      BaliseP.classList.add("hoverTitre");

      BaliseP.innerHTML = text;
      hoverDiv.appendChild(BaliseP);

      return hoverDiv;
    case "redirection":
      item.setAttribute("data-redirection-url", link ?? "");
      if (!item.hasAttribute("data-click-attached")) {
        item.addEventListener("click", () => {
          const redirectionUrl = item.getAttribute("data-redirection-url") || "";
          if (redirectionUrl === "") {
            return;
          }
          window.open(redirectionUrl, "_blank");
        });
        item.setAttribute("data-click-attached", "true");
      }
      return null;

    default:
      hoverDiv.textContent = "Default text content";
      return hoverDiv;
  }
}

