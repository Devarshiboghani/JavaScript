// ===== DATA =====
let tasks = [];
let activeTab = "tasks";

// ===== DOM ELEMENTS =====
const taskInput = document.getElementById("taskInput");
const addBtn    = document.getElementById("addBtn");
const taskList  = document.getElementById("taskList");
const tabTitle  = document.getElementById("tabTitle");
const clearRow  = document.getElementById("clearRow");
const tabBtns   = document.querySelectorAll(".nav-tab");

// ===== EVENT LISTENERS =====

// Add task on button click
addBtn.addEventListener("click", addTask);

// Add task on Enter key
taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTask();
});

// Tab buttons
tabBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    activeTab = btn.getAttribute("data-tab");

    // Sabhi tabs inactive karo
    tabBtns.forEach(function (b) {
      b.className = "nav-tab inactive";
    });

    // Clicked tab active karo
    btn.className = "nav-tab active";

    // Title update karo
    const titles = {
      tasks:     "Tasks",
      today:     "Today",
      scheduled: "Scheduled",
      completed: "Completed"
    };
    tabTitle.textContent = titles[activeTab];

    // Input sirf Tasks aur Today mein dikhao
    if (activeTab === "tasks" || activeTab === "today") {
      taskInput.style.display = "block";
      addBtn.style.display    = "flex";
    } else {
      taskInput.style.display = "none";
      addBtn.style.display    = "none";
    }

    render();
  });
});


// ===== FUNCTIONS =====

// Naya task add karo
function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    alert("Please enter a task!");
    taskInput.focus();
    return;
  }

  const newTask = {
    text: text,
    done: false,
    date: new Date().toDateString()
  };

  tasks.unshift(newTask); // upar add karo
  taskInput.value = "";
  taskInput.focus();
  render();
}

// Task complete / incomplete karo
function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  render();
}

// Task delete karo
function deleteTask(index) {
  tasks.splice(index, 1);
  render();
}

// Completed tasks hatao
function clearDone() {
  tasks = tasks.filter(function (task) {
    return !task.done;
  });
  render();
}


// ===== RENDER =====
function render() {
  const today = new Date().toDateString();

  // Tab ke hisaab se tasks filter karo
  let visible = [];

  if (activeTab === "tasks") {
    visible = tasks;
  } else if (activeTab === "today") {
    visible = tasks.filter(function (task) {
      return !task.done && task.date === today;
    });
  } else if (activeTab === "scheduled") {
    visible = tasks.filter(function (task) {
      return !task.done;
    });
  } else if (activeTab === "completed") {
    visible = tasks.filter(function (task) {
      return task.done;
    });
  }

  // Clear completed button dikhao ya chhupao
  const doneCount = tasks.filter(function (task) { return task.done; }).length;

  if (doneCount > 0 && activeTab === "tasks") {
    clearRow.style.display = "flex";
  } else {
    clearRow.style.display = "none";
  }

  // Koi task nahi toh message dikhao
  if (visible.length === 0) {
    const messages = {
      tasks:     "No tasks yet. Add one above!",
      today:     "No tasks for today.",
      scheduled: "No active tasks.",
      completed: "No completed tasks."
    };
    taskList.innerHTML = '<div class="empty-msg">' + messages[activeTab] + '</div>';
    return;
  }

  // Tasks dikhao - pehle list khali karo
  taskList.innerHTML = "";

  visible.forEach(function (task) {

    // Task card div
    const realIndex = tasks.indexOf(task);

    const card = document.createElement("div");
    card.className = "task-card";

    // Complete button
    const checkBtn = document.createElement("button");
    checkBtn.className = task.done ? "task-cb done-cb" : "task-cb";

    checkBtn.innerHTML = task.done ? '<i class="ti ti-check"></i>' : "";
    checkBtn.onclick = function () { 
      toggleTask(realIndex);
     };

    // Task text
    const taskText = document.createElement("span");
    taskText.className = task.done ? "task-txt done-txt" : "task-txt";

    taskText.textContent = task.text;

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.className = "del-btn";
    delBtn.innerHTML = '<i class="ti ti-trash"></i>';

    delBtn.onclick = function () { 
      deleteTask(realIndex); 
    };

    // Sab card mein daalo
    card.appendChild(checkBtn);
    card.appendChild(taskText);
    card.appendChild(delBtn);

    // Card list mein daalo
    taskList.appendChild(card);
  });
}


// ===== START =====
render();