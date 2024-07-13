// ui elements

const newtaskformEl = document.getElementById("new-task");
const taskListEl = document.getElementById("task-list");
const submitBtn = newtaskformEl.querySelector(`button[value="add"]`);
const removeAllTaskBtn = document.getElementById("clear-taskbar");
const doneBtn = document.getElementById("done");
const filterEl = document.getElementById("filter");
const removeBtn = document.getElementById("remove");

//! task list

// localStorage.setItem("taskList", JSON.stringify(task));
const taskList = JSON.parse(localStorage.getItem("taskList")) || [];
// console.log(taskList);
//initialFetch

FetchTask(taskList);

newtaskformEl.addEventListener("submit", (evt) => {
  if (document.querySelector(`input[name="details"]`).value.trim() === ``) {
    alert("Enter the task details");
    return;
  }
  if (document.querySelector(`input[name="due"]`).value.trim() === ``) {
    alert("Enter the due details");
    return;
  }

  const formData = new FormData(newtaskformEl, submitBtn);
  //   console.log(formData);
  const taskVal = formData.get("details");
  const dueVal = formData.get("due");
  //   console.log("task ", taskVal, " Due By ", dueVal);

  AddTask(taskVal, dueVal);
  FetchTask(taskList);
});

// adding new task to localStorage

function AddTask(taskVal, dueVal) {
  const newTask = {
    details: taskVal,
    due: dueVal,
    done: false,
  };

  taskList.push(newTask);
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

// fetching task

function FetchTask(list) {
  // const list = JSON.parse(localStorage.getItem("taskList")) || [];
  if (taskListEl) {
    taskListEl.innerHTML = ``;
  }
  if (list) {
    list.forEach((task) => {
      let taskEl = document.createElement("li");
      taskEl.innerHTML = `
      <div>
        <span name="details" ${task.done ? 'style="text-decoration: line-through;"' : ''}>
          ${task.details}
        </span>
        <br />
        <span name="duetime">
          ${task.due}
        </span>
      </div>
      <button id="done">&#10004;</button>
      <button id="remove">&#10006;</button>
    `;
      taskListEl.append(taskEl);
    });
  }
}

// clearing taskbar

removeAllTaskBtn.addEventListener("click", () => {
  localStorage.clear();
//   let newList = JSON.parse(localStorage.getItem("taskList"));
  FetchTask([]);
});

// updating the stutus of task

taskListEl.addEventListener("click", (evt) => {
  //   console.log(evt.target);
  if (evt.target.id === "done") {
    let parentEl = evt.target.parentNode;
    let taskDetails = parentEl
      .querySelector(`span[name="details"]`)
      .textContent.trim();
    // console.log(task);
    taskList.forEach((task) => {
      // console.log(task.details)
      if (task.details === taskDetails) {
        console.log("task found");
        if (task.done) {
          task.done = false;
        } else {
          task.done = true;
        }
        localStorage.setItem("taskList", JSON.stringify(taskList));
        FetchTask(taskList);
      }
    });
  }
  if (evt.target.id === "remove") {
    let parentEl = evt.target.parentNode;
    let taskDetails = parentEl
      .querySelector(`span[name="details"]`)
      .textContent.trim();
    console.log("task removed");
    let newTaskList = taskList.filter((task) => task.details !== taskDetails);
    localStorage.setItem("taskList", JSON.stringify(newTaskList));
    FetchTask(newTaskList);
  }
});

// filtering results

filterEl.addEventListener("change", (evt) => {
  // console.log("filter is selected");
  console.log(evt.target.value);

  let filterType = evt.target.value.trim();
  if (filterType === "done") {
    let filteredArray = taskList.filter((task) => task.done);
    console.log(taskList);
    console.log(filteredArray);
    FetchTask(filteredArray);
  }
  if (filterType === "due") {
    let filteredArray = taskList.filter((task) => !task.done);
    console.log(taskList);
    console.log(filteredArray);
    FetchTask(filteredArray);
  }
  if (filterType === "none") {
    FetchTask(taskList);
  }
});
