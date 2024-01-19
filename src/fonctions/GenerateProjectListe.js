
export function GenerateProjectListe(projectJSON) {
  const projectContainer = document.getElementById("project-container");

  if (Array.isArray(projectJSON)) {
    for (const project of projectJSON) {
      const {
        number,
        nameProject,
        TypeProject,
        WhereProject,
        dateProject,
        Statut,
      } = project;

      if (nameProject === "About") {
        let projectDivTitre = document.getElementById("About")
        projectDivTitre.setAttribute('data-project-name', nameProject); // Set data-project-name attribute

        return
      }

      const projectDiv = document.createElement("div");
      projectDiv.classList.add("projectMeun");
      projectDiv.id = nameProject;
      projectDiv.style.backgroundColor = Statut;
      projectDiv.setAttribute('data-project-name', nameProject); // Set data-project-name attribute




  

      // AddActionMeun(projectDiv, nameProject);

      const numberDiv = document.createElement("div");
      numberDiv.classList.add("number");
      const numberP = document.createElement("p");
      numberP.textContent = number;
      numberDiv.appendChild(numberP);
      projectDiv.appendChild(numberDiv);

      const nameProjectDiv = document.createElement("div");
      nameProjectDiv.classList.add("nameProject");
      const nameProjectP = document.createElement("p");
      nameProjectP.textContent = nameProject;
      nameProjectDiv.appendChild(nameProjectP);
      projectDiv.appendChild(nameProjectDiv);

      const TypeProjectDiv = document.createElement("div");
      TypeProjectDiv.classList.add("TypeProject");
      const TypeProjectP = document.createElement("p");
      TypeProjectP.textContent = TypeProject;
      TypeProjectDiv.appendChild(TypeProjectP);
      projectDiv.appendChild(TypeProjectDiv);

      const WhereProjectDiv = document.createElement("div");
      WhereProjectDiv.classList.add("WhereProject");
      const WhereProjectP = document.createElement("p");
      WhereProjectP.textContent = WhereProject;
      WhereProjectDiv.appendChild(WhereProjectP);
      projectDiv.appendChild(WhereProjectDiv);

      const dateProjectDiv = document.createElement("div");
      dateProjectDiv.classList.add("dateProject");
      const dateProjectP = document.createElement("p");
      dateProjectP.textContent = dateProject;
      dateProjectDiv.appendChild(dateProjectP);
      projectDiv.appendChild(dateProjectDiv);


      const svgElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      svgElement.setAttribute("width", "14");
      svgElement.setAttribute("height", "15");
      svgElement.setAttribute("viewBox", "0 0 36 40");

      const pathElements = [
        {
          class: "lockb",
          d: "M27 27C27 34.1797 21.1797 40 14 40C6.8203 40 1 34.1797 1 27C1 19.8203 6.8203 14 14 14C21.1797 14 27 19.8203 27 27ZM15.6298 26.5191C16.4544 25.9845 17 25.056 17 24C17 22.3431 15.6569 21 14 21C12.3431 21 11 22.3431 11 24C11 25.056 11.5456 25.9845 12.3702 26.5191L11 32H17L15.6298 26.5191Z",
        },
        {
          class: "lock",
          d: "M6 21V10C6 5.58172 9.58172 2 14 2V2C18.4183 2 22 5.58172 22 10V21",
        },
        { class: "bling", d: "M29 20L31 22" },
        { class: "bling", d: "M31.5 15H34.5" },
        { class: "bling", d: "M29 10L31 8" },
      ];

      for (const pathData of pathElements) {
        const pathElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        pathElement.setAttribute("class", pathData.class);
        pathElement.setAttribute("d", pathData.d);
        svgElement.appendChild(pathElement);
      }

      const labelElement = document.createElement("label");
      labelElement.classList.add("btn-lock");
      labelElement.setAttribute("for", "inpLock");
      labelElement.appendChild(svgElement);

      const dateProjectDiv2 = document.createElement("div");
      dateProjectDiv2.classList.add("LockProject");
      const dateProjectP2 = document.createElement("p");
      dateProjectP2.textContent = dateProject;
      dateProjectDiv2.appendChild(labelElement);
      projectDiv.appendChild(dateProjectDiv2);

      projectContainer.appendChild(projectDiv);
    }
  } else {
    console.error("Invalid projectJSON. It should be an array.");
  }
}
3;
