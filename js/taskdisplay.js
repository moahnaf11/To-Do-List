import { toDo, mainContainer, displayScreen, displayTitle } from "./addproject";
import { format, parseISO, isThisMonth, parse } from 'date-fns';


let allTaskContainer = document.createElement("div");
allTaskContainer.classList.add("alltasks");
mainContainer.appendChild(allTaskContainer);

let thisMonthContainer = document.createElement("div");
thisMonthContainer.classList.add("mymonth");
mainContainer.appendChild(thisMonthContainer);



export function allTaskDisplay() {
    allTaskContainer.innerHTML = "";
    toDo.projects.forEach((project, projectIndex) => {
        project.task.forEach((tasks, taskIndex) => {
            if ((!tasks.finish) && (!tasks == "")) {
                let taskCard = document.querySelector(`.project-${projectIndex} > .card-${taskIndex}`);
                let taskCardClone = taskCard.cloneNode(true);
                let buttonContainer = taskCardClone.querySelector(".taskcardbuttons");
                taskCardClone.removeChild(buttonContainer);
                allTaskContainer.appendChild(taskCardClone);
            }
        })
    })
    let taskDisplays = mainContainer.querySelectorAll(".task-display");
    taskDisplays.forEach(displays => {
        displays.style.display = "none";
    })
    thisMonthContainer.style.display = "none";
    displayScreen.style.display = "none";
    allTaskContainer.style.display = "flex";
    displayTitle.textContent = "All Tasks";
}



export function showthisMonthTasks () {
    thisMonthContainer.innerHTML = "";
    toDo.projects.forEach((project, projectIndex) => {
        project.task.forEach((tasks, taskIndex) => {
            if ((!tasks.finish) && (!tasks == "")) {
                let dueDate = parseDateString(tasks.duedate);
                if (isThisMonth(dueDate)) {
                    let taskCard = document.querySelector(`.project-${projectIndex} > .card-${taskIndex}`);
                    let taskCardClone = taskCard.cloneNode(true);
                    let buttonContainer = taskCardClone.querySelector(".taskcardbuttons");
                    taskCardClone.removeChild(buttonContainer);
                    thisMonthContainer.appendChild(taskCardClone);
                }
            }
        })
        thisMonthContainer.style.display = "flex";
        displayScreen.style.display = "none";
        allTaskContainer.style.display = "none";
        let taskDisplays = mainContainer.querySelectorAll(".task-display");
        taskDisplays.forEach(displays => {
            displays.style.display = "none";
        })
        displayTitle.textContent = "tasks due this month";
    })
}


function parseDateString(dateString) {
    return parse(dateString, 'dd/MM/yyyy', new Date());
}