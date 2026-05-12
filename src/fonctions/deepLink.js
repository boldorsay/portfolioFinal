import { projectJSON } from "../JSON/ProjectsJSON.js";
import {
  addContentWork,
  changeNameTitreContent,
} from "./utils/domManipulation.js";
import { CheckContentHoverTitre } from "./utils/CheckContentHoverTitre.js";

/** "path" | "query" | "hash" — figé au premier chargement pour les mises à jour */
let syncMode = "hash";
let syncModeReady = false;

function normalizePathname(p) {
  if (!p || p === "/") return "/";
  if (p.length > 1 && p.endsWith("/")) return p.slice(0, -1);
  return p;
}

function safeDecode(s) {
  try {
    return decodeURIComponent(s.replace(/\+/g, "%20"));
  } catch {
    return s;
  }
}

export function initDeepLinkSyncMode() {
  if (syncModeReady) return;
  syncModeReady = true;
  const path = normalizePathname(location.pathname);
  if (path.startsWith("/p/")) {
    const segment = path.slice(3);
    if (segment) {
      syncMode = "path";
      return;
    }
  }
  const params = new URLSearchParams(location.search);
  const pVal = params.get("p") ?? params.get("project");
  if (pVal != null && String(pVal).trim() !== "") {
    syncMode = "query";
    return;
  }
  syncMode = "hash";
}

export function getProjectIdFromLocation() {
  const path = normalizePathname(location.pathname);
  if (path.startsWith("/p/")) {
    const raw = path.slice(3);
    if (raw) return safeDecode(raw);
  }
  const params = new URLSearchParams(location.search);
  const q = params.get("p") ?? params.get("project");
  if (q != null && String(q).trim() !== "") return safeDecode(String(q).trim());
  const h = location.hash;
  if (h && h.length > 1) {
    const raw = h.replace(/^#\/?/, "").trim();
    if (raw) return safeDecode(raw);
  }
  return null;
}

function isValidProjectId(id) {
  return projectJSON.some((p) => p.nameProject === id);
}

/**
 * Garde l’URL en phase avec le projet verrouillé (ou efface si aucune sélection).
 * @param {string | null} name — nameProject du JSON (ex. "Chacho", "Global.com", "About")
 */
export function setProjectInUrl(name) {
  const url = new URL(location.href);
  if (!name) {
    url.pathname = "/";
    url.searchParams.delete("p");
    url.searchParams.delete("project");
    url.hash = "";
    history.replaceState(null, "", url.toString());
    return;
  }
  if (syncMode === "path") {
    url.pathname = "/p/" + encodeURIComponent(name);
    url.search = "";
    url.hash = "";
  } else if (syncMode === "query") {
    url.pathname = "/";
    url.hash = "";
    url.searchParams.set("p", name);
    url.searchParams.delete("project");
  } else {
    url.pathname = "/";
    url.search = "";
    url.hash = "#/" + encodeURIComponent(name);
  }
  history.replaceState(null, "", url.toString());
}

/**
 * Ouvre un projet depuis l’URL au chargement (sans casser la machine d’état).
 * @param {object} stateMachine — instance exportée par AddEventListenersToDiv1
 */
export function applyDeepLinkIfPresent(stateMachine) {
  const id = getProjectIdFromLocation();
  if (!id || !isValidProjectId(id)) return;

  const dvd = document.getElementById("containerDvd");
  if (dvd) dvd.style.display = "none";
  const credit = document.getElementById("Credit");
  const info = document.getElementById("info");
  if (credit) credit.style.color = "black";
  if (info) info.style.color = "black";

  stateMachine.dispatch("click", id);
  addContentWork(id);
  changeNameTitreContent(id);
  CheckContentHoverTitre(id);
  stateMachine.addHoverEffect(id);
}
