import "./style.css";
import { displayDialog } from "../js/addproject";
import { TaskButtonDialog } from "../js/tasks";

let dialog1 = document.querySelector(".project-dialog");
let addTaskButton = document.querySelector(".addtask");
let dialog2 = document.querySelector(".task-dialog");
let form1 = dialog1.querySelector(".form-1");
let addProjectButton = document.querySelector(".addproject");


addProjectButton.addEventListener("click", () => displayDialog(dialog1, form1));

addTaskButton.addEventListener("click", TaskButtonDialog);