import "./style.css";
import { displayDialog, toDo } from "../js/addproject";
import { TaskButtonDialog } from "../js/tasks";
import { allProjectsDisplay } from "../js/addproject";
import { allTaskDisplay } from "../js/taskdisplay";
import { showthisMonthTasks } from "../js/taskdisplay";
import { loadFromLocalStorage } from "../js/storage";
import { ToDo } from "../js/addproject";
import { createCard } from "../js/addproject";
import { displayScreen } from "../js/addproject";
import { createTaskCard } from "../js/tasks";
import { cardClass } from "../js/addproject";
import { mainContainer } from "../js/addproject";
import { ProjectButtonClick } from "../js/addproject";

export let projectUpdate;
let dialog1 = document.querySelector(".project-dialog");
let addTaskButton = document.querySelector(".addtask");
let dialog2 = document.querySelector(".task-dialog");
let form1 = dialog1.querySelector(".form-1");
let addProjectButton = document.querySelector(".addproject");
let allTaskButton = document.querySelector(".viewalltask");
let thisMonthbutton = document.querySelector(".this-month");

export let viewAllProjectButton = document.querySelector(".viewallprojects");

viewAllProjectButton.addEventListener("click", allProjectsDisplay);



addProjectButton.addEventListener("click", () => {
    projectUpdate = false;
    displayDialog(dialog1, form1)
});

allTaskButton.addEventListener("click", allTaskDisplay);

thisMonthbutton.addEventListener("click", showthisMonthTasks);

export let boDo = new ToDo();

window.addEventListener("load", () => {
    const storedToDo = loadFromLocalStorage('toDo');
    if (storedToDo) {
        boDo = Object.assign(new ToDo(), storedToDo);
        // Render the stored projects and tasks
        boDo.projects.forEach((project, projectIndex) => {
            if (project) {
                // Create and append project card
                let projectCard = document.createElement("div");
                projectCard.addEventListener("click", (e) => ProjectButtonClick(e, projectCard));
                projectCard.classList.add("card")
                projectCard.classList.add(`card-${cardClass}`);
                let taskDisplay = document.createElement("div");
                taskDisplay.classList.add("task-display");
                taskDisplay.classList.add(`project-${cardClass}`);
                taskDisplay.addEventListener("click", (e) => taskCardClick(e, taskDisplay));
                mainContainer.append(taskDisplay);
                taskDisplay.style.display = "none";
                ++cardClass;


                let titleDiv = document.createElement("h1");
                titleDiv.textContent = project.title;
                let taskContainer = document.createElement("div");
                taskContainer.classList.add("task-container");
                let taskLabel = document.createElement("div");
                taskLabel.classList.add("label");
                taskLabel.textContent = "Tasks:"
                let taskNumber = document.createElement("div");
                taskNumber.classList.add("task-number");
                taskNumber.textContent = project.task.length;
                taskContainer.append(taskLabel, taskNumber);
                let cardButtonContainer = document.createElement("div");
                cardButtonContainer.classList.add("button-container");
                let removeButton = document.createElement("button");
                let updateButton = document.createElement("button");
                updateButton.textContent = "Update";
                updateButton.classList.add("update");
                let viewButton = document.createElement("button");
                viewButton.textContent = "view";
                viewButton.classList.add("view");
                removeButton.classList.add("remove");
                let addTaskButton = document.createElement("button");
                addTaskButton.classList.add("addtask");
                addTaskButton.textContent = "Add";
                cardButtonContainer.append(removeButton, viewButton, updateButton, addTaskButton);
                removeButton.textContent = "x";


                if (project.description !== "") {
                    let descriptionContainer = document.createElement("div");
                    descriptionContainer.classList.add("description-container");
                    let descriptionLabel = document.createElement("div");
                    descriptionLabel.classList.add(".label");
                    descriptionLabel.textContent = "Description:"
                    let descriptionText = document.createElement("div");
                    descriptionText.classList.add("description-text");
                    descriptionText.textContent = project.description;
                    descriptionContainer.append(descriptionLabel, descriptionText);

            
                    projectCard.append(titleDiv, descriptionContainer, taskContainer, cardButtonContainer);
                }   else {
                    projectCard.append(titleDiv, taskContainer, cardButtonContainer);
                    taskContainer.style.flexGrow = "1";
                }
                // Update project card with stored project data
                // ... Update card contents with project details ...
                displayScreen.appendChild(projectCard);
                project.task.forEach((task, taskIndex) => {
                    if (task) {
                        // Create and append task card
                        const taskCard = createTaskCard();
                        // Update task card with stored task data
                        // ... Update card contents with task details ...
                        const taskDisplay = document.querySelector(`.project-${projectIndex}`);
                        taskDisplay.appendChild(taskCard);
                    }
                });
            }
        });
    }
});
