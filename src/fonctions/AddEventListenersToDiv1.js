import { addHoverTitre } from "./AddHoverTitre";
import { CheckContentHoverTitre } from "./utils/CheckContentHoverTitre";
import { addContentWork, changeNameTitreContent, deleteSwiper } from "./utils/domManipulation";
import { handleDivClick, handleDivMouseOut, handleDivMouseOver } from "./utils/eventHandlers";


export function addEventListenersToDiv1(div1) {
    div1.addEventListener("click", (event) => {
        let targetDiv = getTargetProjectMeun(event.target);
        if (targetDiv) {
            let projectName = targetDiv.getAttribute('data-project-name');
            stateMachine.dispatch('click', projectName);
        }
    });

    div1.addEventListener("mouseover", (event) => {
        document.getElementById("containerDvd").style.display ="none"
        let targetDiv = getTargetProjectMeun(event.target);
        if (targetDiv) {
            let projectName = targetDiv.getAttribute('data-project-name');
            stateMachine.dispatch('mouseover', projectName);
        }
    });

    div1.addEventListener("mouseout", (event) => {
        // Check if no project is currently selected
        if (stateMachine.selectedProject === null) {
            document.getElementById("containerDvd").style.display = "block";
    
            let targetDiv = getTargetProjectMeun(event.target);
            if (targetDiv) {
                let projectName = targetDiv.getAttribute('data-project-name');
                stateMachine.dispatch('mouseout', projectName);
            }
    
        
            document.getElementById("containerDvd").style.display = "block";
            document.getElementById("titreProjectMenu").innerText = " "
        }
    });
}


// Helper function to get the projectMeun div from the event target
function getTargetProjectMeun(target) {
    while (target != null && !target.classList.contains('projectMeun')) {
        target = target.parentElement;
    }
    return target;
}

const stateMachine = {
    states: {}, // Stores the states for each div
    selectedProject: null, // To track the currently selected project
    sound :  "clickSound",


    transitions: {
        noClick: {
            click: function(projectName) {
                // If clicking on a disabled project, set it as the selected project
                this.selectedProject = projectName;

                this.changeState(projectName, 'clicked');

        // Transition all other projects to 'watingClick' state
                Object.keys(this.states).forEach(pName => {
                    if (pName !== projectName) {
                        this.changeState(pName, 'watingClick');
                    }
                });

            
                // Additional logic for click event


                this.toggleLock(projectName);

                this.playAudio(this.sound);
            
                addHoverTitre(projectName);
            },
            mouseover: function(projectName) {

                this.addHoverEffect(projectName)
                addContentWork(projectName);
                changeNameTitreContent(projectName);
                CheckContentHoverTitre(projectName);            
            },
            mouseout: function(projectName) {
                this.removeHoverEffect(projectName)
            }
        },
        clicked: {
            click: function(projectName) {
                this.playAudio(this.sound);

                this.toggleLock(projectName);

                this.selectedProject = null;

                Object.keys(this.states).forEach(pName => {
                        this.changeState(pName, 'noClick');
                });
                // Additional logic for click in disabled state
            },
            mouseover: function(projectName) {
                // Logic for mouseover in disabled state
            },
            mouseout: function(projectName) {
                // Logic for mouseout in disabled state
            }
        },
        watingClick: {
            click: function(projectName) {
                // If there is a previously selected project different from the current one
                if (this.selectedProject && this.selectedProject !== projectName) {let oldProjectMenu = document.getElementById(this.selectedProject);

                    // Remove 'hoverMeun' class from the old selected project
                    if (oldProjectMenu) {
                        oldProjectMenu.classList.remove("hoverMeun");
                        deleteSwiper();
                    } else {
                        console.error("Old project menu not found");
                    }
                
                    let oldLockProjectBtn = oldProjectMenu ? oldProjectMenu.querySelector(".LockProject .btn-lock") : null;
                    
                    // Toggle the lock button of the old selected project
                    if (oldLockProjectBtn) {
                        oldLockProjectBtn.classList.toggle("checked");
                    }
                
                    // Change the previously selected project back to 'watingClick'
                    this.changeState(this.selectedProject, 'watingClick');}
        
                    this.toggleLock(projectName);

        
                // Play audio
                this.playAudio(this.sound);
        
                // Apply hover effects and content changes

                this.addHoverEffect(projectName)
                addContentWork(projectName);
                changeNameTitreContent(projectName);
                CheckContentHoverTitre(projectName);    
        
                // Change the current project to 'clicked'
                this.changeState(projectName, 'clicked');
        
                // Update the selectedProject to the current project
                this.selectedProject = projectName;
            },
            mouseover: function(projectName) {
                // Logic for mouseover in disabled state
            },
            mouseout: function(projectName) {
                // Logic for mouseout in disabled state
            }
        }
    },

    dispatch(actionName, projectName) {
        const currentState = this.states[projectName];
        const action = this.transitions[currentState][actionName];

        if (action) {
            action.call(this, projectName);
        } else {
            // console.log(`Action '${actionName}' cannot be performed in state '${currentState}' for project '${projectName}'`);
        }
    },

    changeState(projectName, newState) {
        if (this.transitions[newState]) {
            this.states[projectName] = newState;
            // console.log(`State changed to '${newState}' for project '${projectName}'`);
        } else {
            // console.log(`Cannot change to unknown state '${newState}' for project '${projectName}'`);
        }
    },
    playAudio(audioId) {
        let audioElement = document.getElementById(audioId);
        if (audioElement) audioElement.play();
    },
    toggleLock(projectName) {
        let projectMeun = document.getElementById(projectName);
        let lockProjectBtn = projectMeun.querySelector(".LockProject .btn-lock");
        if (lockProjectBtn) lockProjectBtn.classList.toggle("checked")
    },
    addHoverEffect(projectName) {

        let projectMenu = document.getElementById(projectName);
        if (projectMenu) projectMenu.classList.add("hoverMeun");
    },
    removeHoverEffect(projectName) {
        if (this.selectedProject !== projectName) {
            let projectMenu = document.getElementById(projectName);
            if (projectMenu) projectMenu.classList.remove("hoverMeun");
            deleteSwiper(); // Assuming this function exists elsewhere
        }
    },
    


};


export function initializeStatesForDiv1(div1) {
    const projectMeuns = div1.querySelectorAll('.projectMeun');
    projectMeuns.forEach(div => {
        stateMachine.states[div.getAttribute('data-project-name')] = 'noClick';
    });
}


