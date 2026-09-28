const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

const emptyState = document.getElementById("emptyState");
const clearCompleted = document.getElementById("clearCompleted");

const dateElement = document.getElementById("date");


/* DATE */

const today = new Date();

dateElement.textContent = today.toLocaleDateString(
    "en-US",
    {
        weekday: "short",
        month: "short",
        day: "numeric"
    }
);


/* LOAD TASKS */

let tasks = JSON.parse(
    localStorage.getItem("tasks")
) || [];

renderTasks();


/* ADD TASK */

addBtn.addEventListener("click", addTask);

taskInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {
            addTask();
        }

    }
);


function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        taskInput.focus();
        return;
    }

    const task = {
        id: Date.now(),

        text: text,

        completed: false
    };

    tasks.push(task);

    saveTasks();

    taskInput.value = "";

    taskInput.focus();

    renderTasks();
}


/* RENDER */

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task) {

        const li = document.createElement("li");

        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }


        const checkbox =
            document.createElement("div");

        checkbox.className = "checkbox";


        const text =
            document.createElement("span");

        text.className = "task-text";

        text.textContent = task.text;


        const deleteBtn =
            document.createElement("button");

        deleteBtn.className = "delete-btn";

        deleteBtn.innerHTML = "🗑";


        /* COMPLETE */

        checkbox.addEventListener(
            "click",
            function() {

                task.completed =
                    !task.completed;

                saveTasks();

                renderTasks();
            }
        );


        /* DELETE */

        deleteBtn.addEventListener(
            "click",
            function() {

                tasks = tasks.filter(
                    function(item) {

                        return item.id !== task.id;

                    }
                );

                saveTasks();

                renderTasks();
            }
        );


        li.appendChild(checkbox);

        li.appendChild(text);

        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });


    updateStats();

}


/* STATS */

function updateStats() {

    const total = tasks.length;

    const completed =
        tasks.filter(
            task => task.completed
        ).length;

    const pending =
        total - completed;


    totalTasks.textContent = total;

    pendingTasks.textContent = pending;

    completedTasks.textContent = completed;


    if (tasks.length === 0) {

        emptyState.style.display = "block";

    } else {

        emptyState.style.display = "none";

    }

}


/* CLEAR COMPLETED */

clearCompleted.addEventListener(
    "click",
    function() {

        tasks = tasks.filter(
            task => !task.completed
        );

        saveTasks();

        renderTasks();
    }
);


/* LOCAL STORAGE */

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}
