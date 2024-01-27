import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import { projectJSON } from "../../JSON/ProjectsJSON";
import Vimeo from "@vimeo/player";
import VimeoPlayer from "@vimeo/player";

let swiper;

export function toggleOtherDivs(currentDiv, pointerEventValue) {
  let allDivs = document.querySelectorAll("#project-container .projectMeun");

  allDivs.forEach((otherDiv) => {
    if (otherDiv !== currentDiv) {
      otherDiv.style.pointerEvents = pointerEventValue; // Set pointer-events based on the passed value
    }
  });
}


export function deleteSwiper() {
  if (swiper) {
    swiper.destroy(true, true); // Le premier paramètre supprime l'instance swiper, le second supprime tous les styles ajoutés par swiper
  }

  // Supprimez les éléments DOM
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  while (swiperWrapper.firstChild) {
    swiperWrapper.removeChild(swiperWrapper.firstChild);
  }
  const swiperPagination = document.querySelector(".swiper-pagination");
  while (swiperPagination.firstChild) {
    swiperPagination.removeChild(swiperPagination.firstChild);
  }
}
``;

export function changeNameTitreContent(nameProject) {
  document.getElementById("titreProjectMenu").textContent = nameProject;
}

export function addContentWork(projectName) {
  const project = projectJSON.find((p) => p.nameProject === projectName);
  const swiperWrapper = document.querySelector(".swiper-wrapper");

  // Clear existing slides and reset if Swiper is initialized
  swiperWrapper.innerHTML = "";
  if (swiper && !swiper.destroyed) {
    swiper.loopDestroy();
  }

  Object.keys(project.content).forEach((key, index) => {
    const contentItem = project.content[key];
    const backgroundColor = project.Exception.Fond;
    //Bad code, change the scarf css
    const specialCondition = project.Exception.StyleCSS;
    console.log(specialCondition);
    const slide = createSlide(
      key,
      contentItem,
      backgroundColor,
      specialCondition,
      project
    );
    swiperWrapper.appendChild(slide);
  });

  // Update or initialize Swiper
  updateSwiper();
}

function createSlide(key, url, backgroundColor, specialCondition, project) {
  const slide = document.createElement("div");
  slide.className = "swiper-slide";
  slide.style.backgroundColor =  backgroundColor;


  slide.addEventListener("click", () => {
    swiper.slideNext();
  });

  if (key.startsWith("image")) {
    const img = document.createElement("img");
    img.src = url;
    slide.appendChild(img);
    if (specialCondition === "scarfCSS") {
      slide.classList.add("scarfCSS");
      console.log("prout");
    }
  } else if (key.startsWith("video")) {
    loadVideoWithLoader(url, slide, backgroundColor, project);
  }
  else if (key.startsWith("text")) {
    // Créer un titre
    const textContainer = document.createElement("div");
    textContainer.className = "slide-text-container"; 

    const title = document.createElement("h2");
    title.className = "slide-title"; // Ajoutez une classe pour le style
    title.textContent = " "; // Remplacez par votre titre
  
    // Créer un texte descriptif
    const text = document.createElement("p");
    text.className = "slide-text"; // Ajoutez une classe pour le style
    text.innerHTML = 'Paul Dorsaz is a Swiss media & interaction designer living in Lausanne. He\'s freshly graduated from ECAL in 2023. He\'s actually working as independent at Workshop Studio<br><br><strong>Education</strong><br>2020 - 2023 Bachelor in Media & Interaction Design - ECAL<br>2018 - 2019 Dgital Junior at M&C SAATCHI <br>2013 - 2017 ERACOM (CFC) <br><br><strong>Social Media</strong><br><a href="https://www.instagram.com/paulnouvelhomme/" style="text-decoration: none; color: black;" onmouseover="this.style.color=\'blue\'" onmouseout="this.style.color=\'black\'">Instagram</a><br><a href="mailto:dorsazpaul@gmail.com" style="text-decoration: none; color: black;" onmouseover="this.style.color=\'blue\'" onmouseout="this.style.color=\'black\'">Mail</a>';

  
    // Ajouter le titre et le texte au slide
    slide.appendChild(title);
    slide.appendChild(text);
  }
  return slide;
}

function updateSwiper() {
  if (swiper && !swiper.destroyed) {
    swiper.loopCreate();
    swiper.update();
  } else {
    initializeSwiper();
  }
}

function initializeSwiper() {
  Swiper.use([Pagination]);
  swiper = new Swiper(".swiper-container", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      renderBullet: (index, className) =>
        `<span class="${className}">${index + 1}</span>`,
    },
    on: {
      slideChange: function(swiper) {
        console.log("dwed");
        document.querySelector(".div1").style.zIndex = "99";
      }
    }
  });
}
function loadVideoWithLoader(videoUrl, slideElement, backgroundColor, project) {
  const iframe = createVideoIframe(videoUrl);
  const loader = createLoader();
  const overlay = ensureOverlayExists(slideElement);

  clearSliderElement(slideElement);

  // setupIframeLoadEvent(iframe, loader);
  if (project.nameProject === "Incident") {
    slideElement.append(loader, iframe); // Append the button to the slide
  } else {
    slideElement.append(loader, overlay, iframe); // Append the button to the slide
  }

  iframe.onload = () => {
    loader.remove();
    slideElement.style.background = backgroundColor;

    const soundToggleButton = createSoundToggleButton(iframe);
    slideElement.appendChild(soundToggleButton);
  };
}

function clearSliderElement(sliderElement) {
  while (sliderElement.firstChild) {
    sliderElement.removeChild(sliderElement.firstChild);
  }
}

function createSoundToggleButton(iframe) {
  const button = document.createElement("button");
  button.textContent = "Play with Sound";
  button.classList.add("sound-toggle-button");

  const player = new VimeoPlayer(iframe);
  player.setVolume(0); // Start muted

  // Add click event listener to play with sound
  button.addEventListener("click", function (event) {
    event.preventDefault();
    player
      .getPaused()
      .then((paused) => {
        if (paused) {
          // If paused, play the video and then unmute
          return player.play().then(() => player.setVolume(1));
        } else {
          // If playing, just toggle mute/unmute
          return player.getVolume().then((volume) => {
            volume === 0 ? player.setVolume(1) : player.setVolume(0);
          });
        }
      })
      .then(() => {
        // Update button text based on the current volume
        player.getVolume().then((volume) => {
          button.textContent = volume === 0 ? "Play with Sound" : "Mute";
        });
      })
      .catch(function (error) {
        console.error("Error in controlling video:", error);
      });
  });

  return button;
}

function createVideoIframe(videoUrl) {
  const iframe = document.createElement("iframe");
  iframe.src = videoUrl;
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("allowfullscreen", "");
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.setAttribute("webkitallowfullscreen", "");
  iframe.setAttribute("mozallowfullscreen", "");
  iframe.setAttribute("allowfullscreen", "");
  iframe.setAttribute("allow", "autoplay");
  return iframe;
}

function createLoader() {
  const loader = document.createElement("div");
  loader.className = "loader";
  loader.style.position = "absolute";
  loader.style.top = "50%";
  loader.style.left = "50%";
  loader.style.transform = "translate(-50%, -50%)";
  return loader;
}

function ensureOverlayExists(slideElement) {
  let overlay = slideElement.querySelector(".video-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "video-overlay";
    overlay.style.display = "block";

    // Set additional overlay styles here
  }
  return overlay;
}

function setupIframeLoadEvent(iframe, loader) {
  iframe.onload = () => loader.remove();
}
