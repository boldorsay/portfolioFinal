import "./style.css";
import { PopulateNumbers, projectJSON } from "./src/JSON/ProjectsJSON.js";

import "swiper/swiper-bundle.css";
import { addEventListenersToDiv1, initializeStatesForDiv1 } from "./src/fonctions/AddEventListenersToDiv1";
import { dvd } from "./src/fonctions/Dvd";
import { GenerateProjectListe } from "./src/fonctions/GenerateProjectListe";



window.onload = async () => {
  //load the font
  // load the 3d text

  GenerateProjectListe
  // troisDText();
  GenerateProjectListe
  await PopulateNumbers(); // Utilisez la fonction populateNumbers définie plus tôt
  const htmlCode = GenerateProjectListe(projectJSON);
  let div1 = document.querySelector('.div1')
  initializeStatesForDiv1(div1)
  addEventListenersToDiv1(div1)
  dvd()
};
 



function displayFullScreenMessageIfMobile(message = "Available soon on phone") {
  const mobileThreshold = 768; // Thresholds for mobile device screen width

  function checkDeviceAndDisplayMessage() {
      const userAgent = navigator.userAgent;
      const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) || window.innerWidth <= mobileThreshold;

      // Find existing message div, if any
      const existingDiv = document.querySelector('.full-screen-message');

      if (isMobileDevice) {
          if (!existingDiv) {
              const div = document.createElement("div");
              div.className = 'full-screen-message';
              div.innerHTML = `<p>${message}</p>`;
              document.body.appendChild(div);
          }
      } else {
          if (existingDiv) {
              existingDiv.parentNode.removeChild(existingDiv);
          }
      }
  }

  // Initial check
  checkDeviceAndDisplayMessage();

  // Add resize event listener
  window.addEventListener('resize', checkDeviceAndDisplayMessage);
}

// Usage
 displayFullScreenMessageIfMobile();
