import { projectUpdate } from "../src/index";
import { viewAllProjectButton } from "../src/index";
import { TaskButtonDialog, taskCardClick, taskUpdate } from "./tasks";




let dialog1 = document.querySelector(".project-dialog");
let closeButton = dialog1.querySelector(".close");
let cardClass = 0;
export let displayScreen = document.querySelector(".display-child");
let form1 = dialog1.querySelector(".form-1");
let projectDescription = form1.querySelector("textarea");
let projectTitleText = form1.querySelector("#projectName");
export let displayTitle = document.querySelector(".display-title");
export let index;

export let mainContainer = document.querySelector(".display");

export function allProjectsDisplay () {
    displayScreen.style.display = "flex";
    let allTaskContainer = document.querySelector(".alltasks");
    allTaskContainer.style.display = "none";
    let thisMonthContainer = document.querySelector(".mymonth");
    thisMonthContainer.style.display = "none";
    let taskDisplay = document.querySelectorAll(".task-display");
    taskDisplay.forEach(displays => {
        displays.style.display = "none";

    })
    displayTitle.textContent = "your projects";
}


function ProjectButtonClick (e, projectCard) {
    index = projectCard.className.split(" ")[1].split("-")[1];
    let target = e.target.classList.value;
    switch (target) {
        case "remove":
            toDo.deleteProject(index);
            let displayTask = document.querySelector(`.project-${index}`);
            displayTask.remove();
            projectCard.remove();
            break;
        
        case "update":
            projectUpdate = true;
            displayDialog(dialog1, form1);
            break;


        case "view":
            displayScreen.style.display = "none";
            let taskDisplay = document.querySelector(`.project-${index}`);
            mainContainer.appendChild(taskDisplay);
            taskDisplay.style.display = "flex";
            displayTitle.textContent = `${toDo.projects[index].title} tasks`;
            break;

        case "addtask":
            taskUpdate = false;
            TaskButtonDialog();
            break;



    } 

}

export class ToDo {
    constructor() {
        this.projects = [];
    }

    deleteProject(index) {
        this.projects[index] = "";
        if (this.projects.every((item) => item === "")) {
            displayTitle.textContent = "No Projects yet";
        }


    }

    updateProject() {
        let projectCard = document.querySelector(`.card-${index}`);
        let position = index;
        this.projects[position].title = projectTitleText.value;
        let header = projectCard.querySelector("h1");
        header.textContent = projectTitleText.value;
        if (projectDescription.value) {
            this.projects[position].description = projectDescription.value;
            let descriptionContainer = projectCard.querySelector(".description-container");
            if (descriptionContainer) {
                let descriptionText = projectCard.querySelector(".description-text");
                descriptionText.textContent = projectDescription.value;
            }   else {
                let taskContainer = projectCard.querySelector(".task-container");
                taskContainer.style.flexGrow = "0";
                let buttonContainer = projectCard.querySelector(".button-container");
                projectCard.append(header, createProjectDescription(), taskContainer, buttonContainer);
            }

        }   else {
            let descriptionContainer = projectCard.querySelector(".description-container");
            descriptionContainer.remove();
            let taskContainer = projectCard.querySelector(".task-container");
            taskContainer.style.flexGrow = "1";
        }
    }
}

export let toDo = new ToDo(); 

export class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.task = [];
        this.taskIndex = -1;
    }

}

export function displayDialog (dialogs, form1) {
    
    dialogs.showModal();
    form1.style.display = "flex";
    form1.style.flexDirection = "column";
    form1.style.gap = "1rem";


}

closeButton.addEventListener("click", () => closeDialog(dialog1))

export function closeDialog (dialogs) {
    dialogs.close();  
}


function createCard () {
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
    return appendDivsInCard(projectCard)
}


function createProjectDescription () {
    
    let descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("description-container");
    let descriptionLabel = document.createElement("div");
    descriptionLabel.classList.add(".label");
    descriptionLabel.textContent = "Description:"
    let descriptionText = document.createElement("div");
    descriptionText.classList.add("description-text");
    descriptionText.textContent = projectDescription.value;
    descriptionContainer.append(descriptionLabel, descriptionText);

    return descriptionContainer;

}
    
    


function appendDivsInCard (projectCard) {
    let projectObject = new Project(projectTitleText.value, projectDescription.value);
    toDo.projects.push(projectObject);
    let titleDiv = document.createElement("h1");
    titleDiv.textContent = projectObject.title;
    let taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");
    let taskLabel = document.createElement("div");
    taskLabel.classList.add("label");
    taskLabel.textContent = "Tasks:"
    let taskNumber = document.createElement("div");
    taskNumber.classList.add("task-number");
    taskNumber.textContent = projectObject.task.length;
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
    if (projectDescription.value !== "") {
        let descriptionContainer = createProjectDescription();

        projectCard.append(titleDiv, descriptionContainer, taskContainer, cardButtonContainer);
    }   else {
        projectCard.append(titleDiv, taskContainer, cardButtonContainer);
        taskContainer.style.flexGrow = "1";
    }
    return projectCard;
}

function addProject () {
    displayTitle.textContent = "your projects";
    displayScreen.appendChild(createCard());
    if (displayScreen.style.display == "none") {
        allProjectsDisplay();

    }


}

form1.addEventListener("submit", projectformSubmission)

export function projectformSubmission (e) {
    e.preventDefault();
    closeDialog(dialog1);
    if (!projectUpdate) {
        addProject();
    }   else {
        toDo.updateProject();
    }
    
}



