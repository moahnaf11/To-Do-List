import { ToDo, Project, toDo, displayDialog, closeDialog, displayScreen, taskDisplay, mainContainer, index } from "./addproject";
import { format, parseISO, isBefore, isAfter, addMonths } from 'date-fns';

let addTaskButton = document.querySelector(".addtask");
let viewAllTaskButton = document.querySelector(".viewalltask");
let dialog2 = document.querySelector(".task-dialog");
let form2 = document.querySelector(".form-2");
let closeButton = dialog2.querySelector(".close");
let projectIndex;
let taskIndexes;



export let taskUpdate;

export function TaskButtonDialog () {
    displayDialog(dialog2, form2);
}

closeButton.addEventListener("click", () => closeDialog(dialog2));


class Task {
    constructor(title, description, priority, duedate) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.duedate = duedate;
        this.finish = false;
    }
}

form2.addEventListener("submit", (e) => {
    e.preventDefault()
    dialog2.close();
    if (taskUpdate) {
        editTask()
    }   else {
        addTask();
        createTaskCard();
    }
});

function editTask () {
    let returned = addTask();
    toDo.projects[projectIndex].task[taskIndexes].title = returned[0];
    toDo.projects[projectIndex].task[taskIndexes].description = returned[1];
    toDo.projects[projectIndex].task[taskIndexes].priority = returned[2];
    toDo.projects[projectIndex].task[taskIndexes].duedate = returned[3];   
    
    let titleDiv = document.querySelector(`.project-${projectIndex} > .card-${taskIndexes} > .title-container`);
    titleDiv.textContent = returned[0];
    let desDiv = document.querySelector(`.project-${projectIndex} > .card-${taskIndexes} > .description-container`);
    desDiv.textContent = returned[1];
    let dateDiv = document.querySelector(`.project-${projectIndex} > .card-${taskIndexes} > .date-container`);
    dateDiv.textContent = returned[3];
    let taskCard = document.querySelector(`.project-${projectIndex} > .card-${taskIndexes}`);
    
    if (returned[2] == "High") {
        taskCard.style.borderLeft = "10px solid red";
    }   else if (returned[2] == "Medium") {
        taskCard.style.borderLeft = "10px solid orange";
    }   else {
        taskCard.style.borderLeft = "10px solid green";
    }
}


function addTask () {
    let taskTitle = dialog2.querySelector(".title > input");
    let taskDescription = dialog2.querySelector(".description > input");
    let taskDate = dialog2.querySelector(".date > input");
    let taskPriority = dialog2.querySelector(".priority > select");
    let formattedDate = format(parseISO(taskDate.value), 'dd/MM/yyyy');
    if (taskUpdate) {
        return [taskTitle.value, taskDescription.value, taskPriority.value, formattedDate];
    }   else {
        let taskObject = new Task(taskTitle.value, taskDescription.value, taskPriority.value, formattedDate);
        toDo.projects[index].task.push(taskObject);
    }
}

function createTaskCard () {
    ++toDo.projects[index].taskIndex;
    let taskCard = document.createElement("div");
    taskCard.classList.add("taskCard");
    taskCard.classList.add(`card-${toDo.projects[index].taskIndex}`);

    let taskDisplay = document.querySelector(`.project-${index}`);
    taskDisplay.append(appendDivsToTask(taskCard));
    let taskNumber = document.querySelector(`.card-${index} > .task-container > .task-number`);
    let count = 0;
    toDo.projects[index].task.forEach(tasks => {
        if ((tasks != "") && (!tasks.finish)) {
            ++count;
        }
    })
    taskNumber.textContent = count;
}

 export function taskCardClick (e, taskDisplay) {
    let target = e.target.classList.value.split(" ")[0];  
    projectIndex = taskDisplay.classList.value.split(" ")[1].split("-")[1];
    taskIndexes = e.target.classList.value.split(" ")[1].split("-")[1];
    let taskCard = taskDisplay.querySelector(`.taskCard.card-${taskIndexes}`);
    switch (target) {
        case "edit":
            taskUpdate = true;
            TaskButtonDialog(dialog2, form2);
            break;
        
        case "remove":
            taskCard.remove();
            toDo.projects[projectIndex].task[taskIndexes] = "";
            let count = 0;
            toDo.projects[projectIndex].task.forEach(tasks => {
                if (tasks != "") {
                    ++count
                }
            let taskText = document.querySelector(`.card.card-${projectIndex} > .task-container > .task-number`);
            taskText.textContent = count;
            })
            break;

        case "done":
            if (!toDo.projects[projectIndex].task[taskIndexes].finish) {
                toDo.projects[projectIndex].task[taskIndexes].finish = true;
                taskCard.style.opacity = "0.5";
                e.target.textContent = "Undo";
            }   else {
                toDo.projects[projectIndex].task[taskIndexes].finish = false;
                e.target.textContent = "Done";
                taskCard.style.opacity = "1";
            }
            let projectCardTaskText = document.querySelector(`.card.card-${projectIndex} > .task-container > .task-number`);
            let proCount = 0;
            toDo.projects[projectIndex].task.forEach(tasks => {
                if ((tasks != "") && (!tasks.finish)) {
                    ++proCount;
                }
            })
            projectCardTaskText.textContent = proCount;
            break;
    }
}

function appendDivsToTask (taskCard) {
    let taskTitleContainer = document.createElement("h1");
    taskTitleContainer.classList.add("title-container");
    taskTitleContainer.textContent = toDo.projects[index].task[toDo.projects[index].taskIndex].title;
    let taskDescriptionContainer = document.createElement("div");
    taskDescriptionContainer.classList.add("description-container");
    taskDescriptionContainer.textContent = toDo.projects[index].task[toDo.projects[index].taskIndex].description;
    let taskDateContainer = document.createElement("div");
    taskDateContainer.classList.add("date-container");
    taskDateContainer.textContent = toDo.projects[index].task[toDo.projects[index].taskIndex].duedate;
    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("taskcardbuttons");
    let editButton = document.createElement("button");
    let removeButton = document.createElement("button");
    let doneButton = document.createElement("button");
    doneButton.classList.add("done");
    doneButton.classList.add(`button-${toDo.projects[index].taskIndex}`);
    doneButton.textContent = "done";
    editButton.classList.add("edit");
    editButton.classList.add(`button-${toDo.projects[index].taskIndex}`);
    removeButton.classList.add("remove");
    removeButton.classList.add(`button-${toDo.projects[index].taskIndex}`);
    editButton.textContent = "edit";
    removeButton.textContent = "x";

    buttonContainer.append(editButton, removeButton, doneButton);
    taskCard.append(taskTitleContainer, taskDescriptionContainer, taskDateContainer, buttonContainer);
    if (toDo.projects[index].task[toDo.projects[index].taskIndex].priority === "High") {
        taskCard.style.borderLeft = "10px solid red";
    }   else if (toDo.projects[index].task[toDo.projects[index].taskIndex].priority === "Medium") {
        taskCard.style.borderLeft = "10px solid orange";
    }   else {
        taskCard.style.borderLeft = "10px solid green";
    }
    return taskCard;

}

