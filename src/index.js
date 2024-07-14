import "./style.css";
import { displayDialog } from "../js/addproject";
import { TaskButtonDialog } from "../js/tasks";
import { allProjectsDisplay } from "../js/addproject";

export let projectUpdate;
let dialog1 = document.querySelector(".project-dialog");
let addTaskButton = document.querySelector(".addtask");
let dialog2 = document.querySelector(".task-dialog");
let form1 = dialog1.querySelector(".form-1");
let addProjectButton = document.querySelector(".addproject");

export let viewAllProjectButton = document.querySelector(".viewallprojects");

viewAllProjectButton.addEventListener("click", allProjectsDisplay);



addProjectButton.addEventListener("click", () => {
    projectUpdate = false;
    displayDialog(dialog1, form1)
});