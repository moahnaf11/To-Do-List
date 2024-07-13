import { ToDo, Project, toDo, displayDialog, closeDialog } from "./addproject";

let addTaskButton = document.querySelector(".addtask");
let viewAllTaskButton = document.querySelector(".viewalltask");
let dialog2 = document.querySelector(".task-dialog");
let form2 = document.querySelector(".form-2");
let closeButton = dialog2.querySelector(".close");
export function TaskButtonDialog () {
    if (!toDo.projects.every(item => item === "")) {
        displayDialog(dialog2, form2);
    }   else {
        alert("Please Add a Project first");
    }

}

closeButton.addEventListener("click", () => closeDialog(dialog2));


class Task {
    constructor(title, description, priority, duedate) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.duedate = duedate;
    }

    deleteTask() {

    }

    editTask() {

    }
}

