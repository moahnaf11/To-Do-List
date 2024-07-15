import { toDo, mainContainer, displayScreen, displayTitle } from "./addproject";

export let allTaskContainer = document.createElement("div");
allTaskContainer.classList.add("alltasks");
mainContainer.appendChild(allTaskContainer);
let taskDisplays = document.querySelectorAll(".task-display");

export function allTaskDisplay() {
    toDo.projects.forEach((project, projectIndex) => {
        project.task.forEach((tasks, taskIndex) => {
            if ((!tasks.finish) && (!tasks == "")) {
                let taskCard = document.querySelector(`.project-${projectIndex} > .card-${taskIndex}`);
                allTaskContainer.appendChild(taskCard);
            }
        })
    })
    taskDisplays.forEach(displays => {
        displays.style.display = "none";
    })
    displayScreen.style.display = "none";
    allTaskContainer.style.display = "flex";
    displayTitle.textContent = "All Tasks";
}