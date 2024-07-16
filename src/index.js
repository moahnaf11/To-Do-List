import "./style.css";
import { displayDialog } from "../js/addproject";
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
import { taskCardClick } from "../js/tasks";

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

export let toDo = new ToDo();


window.addEventListener("load", () => {
    const storedToDo = loadFromLocalStorage('toDo');
    if (storedToDo) {
        toDo = Object.assign(new ToDo(), storedToDo);
        // Render the stored projects and tasks
        toDo.projects.forEach((project, projectIndex) => {
            if (project) {
                // Create and append project card
                let projectCard = document.createElement("div");
                projectCard.addEventListener("click", (e) => ProjectButtonClick(e, projectCard));
                projectCard.classList.add("card")
                projectCard.classList.add(`card-${projectIndex}`);
                let taskDisplay = document.createElement("div");
                taskDisplay.classList.add("task-display");
                taskDisplay.classList.add(`project-${projectIndex}`);
                taskDisplay.addEventListener("click", (e) => taskCardClick(e, taskDisplay));
                mainContainer.append(taskDisplay);
                taskDisplay.style.display = "none";


                let titleDiv = document.createElement("h1");
                titleDiv.textContent = project.title;
                let taskContainer = document.createElement("div");
                taskContainer.classList.add("task-container");
                let taskLabel = document.createElement("div");
                taskLabel.classList.add("label");
                taskLabel.textContent = "Tasks:"
                let taskNumber = document.createElement("div");
                taskNumber.classList.add("task-number");
                let count = 0;
                toDo.projects[projectIndex].task.forEach(tasks => {
                    if ((tasks != "") && (!tasks.finish)) {
                        ++count;
                    }
                })
                taskNumber.textContent = count;
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
                        let taskCard = document.createElement("div");
                        taskCard.classList.add("taskCard");
                        taskCard.classList.add(`card-${taskIndex}`);

                        let taskDisplays = document.querySelector(`.project-${projectIndex}`);
                        
                        let taskTitleContainer = document.createElement("h1");
                        taskTitleContainer.classList.add("title-container");
                        taskTitleContainer.textContent = toDo.projects[projectIndex].task[taskIndex].title;
                        let taskDescriptionContainer = document.createElement("div");
                        taskDescriptionContainer.classList.add("description-container");
                        taskDescriptionContainer.textContent = toDo.projects[projectIndex].task[taskIndex].description;
                        let taskDateContainer = document.createElement("div");
                        taskDateContainer.classList.add("date-container");
                        taskDateContainer.textContent = toDo.projects[projectIndex].task[taskIndex].duedate;
                        let buttonContainer = document.createElement("div");
                        buttonContainer.classList.add("taskcardbuttons");
                        let editButton = document.createElement("button");
                        let removeButton = document.createElement("button");
                        let doneButton = document.createElement("button");
                        doneButton.classList.add("done");
                        doneButton.classList.add(`button-${taskIndex}`);
                        doneButton.textContent = "done";
                        editButton.classList.add("edit");
                        editButton.classList.add(`button-${taskIndex}`);
                        removeButton.classList.add("remove");
                        removeButton.classList.add(`button-${taskIndex}`);
                        editButton.textContent = "edit";
                        removeButton.textContent = "x";

                        buttonContainer.append(editButton, removeButton, doneButton);
                        taskCard.append(taskTitleContainer, taskDescriptionContainer, taskDateContainer, buttonContainer);
                        if (toDo.projects[projectIndex].task[taskIndex].priority === "High") {
                            taskCard.style.borderLeft = "10px solid red";
                        }   else if (toDo.projects[projectIndex].task[taskIndex].priority === "Medium") {
                            taskCard.style.borderLeft = "10px solid orange";
                        }   else {
                            taskCard.style.borderLeft = "10px solid green";
                        }
                        taskDisplays.appendChild(taskCard);


                        let taskNumber = document.querySelector(`.card-${projectIndex} > .task-container > .task-number`);
                        let count = 0;
                        toDo.projects[projectIndex].task.forEach(tasks => {
                            if ((tasks != "") && (!tasks.finish)) {
                                ++count;
                            }
                        })
                        taskNumber.textContent = count;
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
