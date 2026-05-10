let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let activeTab = "tasks";


const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const tabTitle = document.getElementById("tabTitle");
const clearRow = document.getElementById("clearRow");
const tabBtns = document.querySelectorAll(".nav-tab");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");


addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(e){
  if(e.key === "Enter"){
    addTask();
  }
});

tabBtns.forEach(function(btn){

  btn.addEventListener("click", function(){

    activeTab = btn.dataset.tab;

    tabBtns.forEach(function(b){
      b.className = "nav-tab inactive";
    });

    btn.className = "nav-tab active";

    const titles = {
      tasks:"Tasks",
      today:"Today",
      completed:"Completed",
      pending:"Pending"
    };

    tabTitle.textContent = titles[activeTab];

    render();
  });

});


function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showToast(message){

  const toast = document.createElement("div");

  toast.className = "toast";

  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(function(){
    toast.remove();
  },2000);

}


function addTask(){

  const text = taskInput.value.trim();

  if(text === ""){
    alert("Please enter a task!");
    return;
  }

  const newTask = {

    text:text,
    done:false,
    date:new Date().toDateString(),
    time:new Date().toLocaleTimeString()

  };

  tasks.unshift(newTask);

  saveTasks();

  render();

  showToast("Task Added!");

  taskInput.value = "";

  taskInput.focus();

}


function toggleTask(index){

  tasks[index].done = !tasks[index].done;

  saveTasks();

  render();

  showToast(
    tasks[index].done
    ? "Task Completed!"
    : "Task Pending!"
  );

}


function deleteTask(index){

  tasks.splice(index,1);

  saveTasks();

  render();

  showToast("Task Deleted!");

}


function editTask(index){

  const updated = prompt("Edit your task", tasks[index].text);

  if(updated !== null && updated.trim() !== ""){

    tasks[index].text = updated.trim();

    saveTasks();

    render();

    showToast("Task Updated!");

  }

}


function clearDone(){

  tasks = tasks.filter(function(task){
    return !task.done;
  });

  saveTasks();

  render();

  showToast("Completed Tasks Cleared!");

}


function render(){

  const today = new Date().toDateString();

  let visible = [];

  if(activeTab === "tasks"){
    visible = tasks;
  }

  else if(activeTab === "today"){

    visible = tasks.filter(function(task){
      return task.date === today;
    });

  }

  else if(activeTab === "completed"){

    visible = tasks.filter(function(task){
      return task.done;
    });

  }

  else if(activeTab === "pending"){

    visible = tasks.filter(function(task){
      return !task.done;
    });

  }


  // COUNTER

  totalTasks.textContent =
    "Total: " + tasks.length;

  completedTasks.textContent =
    "Completed: " +
    tasks.filter(t => t.done).length;


  // CLEAR BTN

  if(tasks.some(t => t.done)){
    clearRow.style.display = "flex";
  }else{
    clearRow.style.display = "none";
  }


  // EMPTY

  if(visible.length === 0){

    taskList.innerHTML =
    `
      <div class="empty-msg">
        No tasks found.
      </div>
    `;

    return;
  }


  // RESET

  taskList.innerHTML = "";


  // TASKS

  visible.forEach(function(task){

    const realIndex = tasks.indexOf(task);

    const card = document.createElement("div");

    card.className = "task-card";


    // CHECK BUTTON

    const checkBtn = document.createElement("button");

    checkBtn.className =
      task.done
      ? "task-cb done-cb"
      : "task-cb";

    checkBtn.innerHTML =
      task.done
      ? '<i class="ti ti-check"></i>'
      : "";

    checkBtn.onclick = function(){
      toggleTask(realIndex);
    };


    // TEXT

    const taskText = document.createElement("div");

    taskText.className =
      task.done
      ? "task-txt done-txt"
      : "task-txt";

    taskText.textContent = task.text;


    // TIME

    const time = document.createElement("div");

    time.className = "task-time";

    time.textContent = task.time;


    // TEXT WRAP

    const textWrap = document.createElement("div");

    textWrap.className = "text-wrap";

    textWrap.appendChild(taskText);

    textWrap.appendChild(time);


    // EDIT BTN

    const editBtn = document.createElement("button");

    editBtn.className = "edit-btn";

    editBtn.innerHTML =
      '<i class="ti ti-edit"></i>';

    editBtn.onclick = function(){
      editTask(realIndex);
    };


    // DELETE BTN

    const delBtn = document.createElement("button");

    delBtn.className = "del-btn";

    delBtn.innerHTML =
      '<i class="ti ti-trash"></i>';

    delBtn.onclick = function(){
      deleteTask(realIndex);
    };


    // APPEND

    card.appendChild(checkBtn);

    card.appendChild(textWrap);

    card.appendChild(editBtn);

    card.appendChild(delBtn);

    taskList.appendChild(card);

  });

}


render();