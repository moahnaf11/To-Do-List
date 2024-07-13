let dialog1 = document.querySelector(".project-dialog");
let closeButton = dialog1.querySelector(".close");
let cardClass = 0;
let displayScreen = document.querySelector(".display-child");
let form1 = dialog1.querySelector(".form-1");
let projectDescription = form1.querySelector("textarea");
let projectTitleText = form1.querySelector("#projectName");
let displayTitle = document.querySelector(".display-title");


function ProjectButtonClick (e, projectCard) {
    let index = projectCard.className.split(" ")[1].split("-")[1];
    let target = e.target.classList.value;
    switch (target) {
        case "remove":
            toDo.deleteProject(index);
            projectCard.remove();
            break;
        
        case "edit":
            toDo.editProject()
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

    editProject() {
        displayDialog();


    }

}

export let toDo = new ToDo(); 

export class Project {
    constructor(title, description, task=0) {
        this.title = title;
        this.description = description;
        this.task = task;
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
    ++cardClass;
    return appendDivsInCard(projectCard)
}

function appendDivsInCard (projectCard) {
    let projectObject = new Project(projectTitleText.value, projectDescription.value)
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
    taskNumber.textContent = projectObject.task;
    taskContainer.append(taskLabel, taskNumber);
    let cardButtonContainer = document.createElement("div");
    cardButtonContainer.classList.add("button-container");
    let removeButton = document.createElement("button");
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit");
    removeButton.classList.add("remove");
    cardButtonContainer.append(removeButton, editButton);
    removeButton.textContent = "Remove";
    if (projectDescription.value !== "") {
        let descriptionContainer = document.createElement("div");
        descriptionContainer.classList.add("description-container");
        let descriptionLabel = document.createElement("div");
        descriptionLabel.classList.add(".label");
        descriptionLabel.textContent = "Description:"
        let descriptionText = document.createElement("div");
        descriptionText.classList.add("description-text");
        descriptionText.textContent = projectObject.description;
        descriptionContainer.append(descriptionLabel, descriptionText);

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

}

form1.addEventListener("submit", projectformSubmission)

export function projectformSubmission (e) {
    e.preventDefault();
    closeDialog(dialog1);
    
    addProject();
}



