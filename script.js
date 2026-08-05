// =========================
// VARIABLES
// =========================

let tasks = [];


const taskInput = document.getElementById("taskInput");

const searchInput = document.getElementById("searchInput");

const priority = document.getElementById("priority");

const dueDate = document.getElementById("dueDate");

const addTaskButton = document.getElementById("addTask");

const taskList = document.getElementById("taskList");

const themeToggle = document.getElementById("themeToggle");

const totalTasks = document.getElementById("totalTasks");

const completedTasks = document.getElementById("completedTasks");

const pendingTasks = document.getElementById("pendingTasks");

const allFilter = document.getElementById("allFilter");

const activeFilter = document.getElementById("activeFilter");

const completedFilter = document.getElementById("completedFilter");


// =========================
// ADD TASK
// =========================

function addTask() {


    let taskText = taskInput.value.trim();


    if (taskText === "") {

        alert("Please enter a task");

        return;

    }


    let task = {

        id: Date.now(),

        title: taskText,

        priority: priority.value,

        date: dueDate.value,

        completed: false

    };


    tasks.push(task);


    saveTasks();

    displayTasks();


    taskInput.value = "";

    dueDate.value = "";


}

// =========================
// UPDATE DASHBOARD
// =========================


function updateDashboard(){


    let total = tasks.length;



    let completed = tasks.filter(function(task){


        return task.completed === true;


    }).length;



    let pending = total - completed;



    totalTasks.innerHTML = total;


    completedTasks.innerHTML = completed;


    pendingTasks.innerHTML = pending;


}


// =========================
// DISPLAY TASKS
// =========================

function displayTasks(taskArray = tasks) {


    taskList.innerHTML = "";



    taskArray.forEach(function(task) {


        let li = document.createElement("li");



        if(task.completed){

            li.classList.add("completed");

        }



        li.innerHTML = `


        <div>


            <h3 onclick="completeTask(${task.id})">

                ${task.title}

            </h3>


            <p class="priority ${task.priority.toLowerCase()}">

                ${task.priority}

            </p>


            <p>

                Due: ${task.date || "No Date"}

            </p>


        </div>



        <div>


            <button onclick="editTask(${task.id})">

                Edit

            </button>



            <button onclick="deleteTask(${task.id})">

                Delete

            </button>


        </div>


        `;


        taskList.appendChild(li);


    });


}



// =========================
// SEARCH TASK
// =========================

function searchTasks(){


    let searchText = searchInput.value.toLowerCase();



    let filteredTasks = tasks.filter(function(task){


        return task.title
        .toLowerCase()
        .includes(searchText);


    });



    displayTasks(filteredTasks);


}

// =========================
// FILTER TASKS
// =========================


function filterTasks(type){


    let filteredTasks;



    if(type === "all"){


        filteredTasks = tasks;


    }



    else if(type === "active"){


        filteredTasks = tasks.filter(function(task){


            return task.completed === false;


        });


    }



    else if(type === "completed"){


        filteredTasks = tasks.filter(function(task){


            return task.completed === true;


        });


    }



    displayTasks(filteredTasks);


}



// =========================
// DELETE TASK
// =========================

function deleteTask(id){


    tasks = tasks.filter(function(task){


        return task.id !== id;


    });



    saveTasks();

    displayTasks();


}



// =========================
// EDIT TASK
// =========================

function editTask(id){


    let task = tasks.find(function(task){


        return task.id === id;


    });



    let newTitle = prompt(

        "Edit task:",

        task.title

    );



    if(newTitle !== null && newTitle.trim() !== ""){


        task.title = newTitle;


        saveTasks();

        displayTasks();


    }


}



// =========================
// COMPLETE TASK
// =========================

function completeTask(id){


    tasks = tasks.map(function(task){


        if(task.id === id){


            task.completed = !task.completed;


        }


        return task;


    });



    saveTasks();

    displayTasks();


}



// =========================
// LOCAL STORAGE
// =========================

function saveTasks(){


    localStorage.setItem(

        "tasks",

        JSON.stringify(tasks)

    );


}



function loadTasks(){


    let savedTasks = localStorage.getItem("tasks");



    if(savedTasks){


        tasks = JSON.parse(savedTasks);


    }



    displayTasks();


}



// =========================
// DARK MODE
// =========================

function toggleTheme(){


    document.body.classList.toggle("dark");



    let theme = document.body.classList.contains("dark")

        ? "dark"

        : "light";



    localStorage.setItem(

        "theme",

        theme

    );


}



function loadTheme(){


    let savedTheme = localStorage.getItem("theme");



    if(savedTheme === "dark"){


        document.body.classList.add("dark");


    }


}



// =========================
// EVENTS
// =========================


addTaskButton.addEventListener(

    "click",

    addTask

);



searchInput.addEventListener(

    "input",

    searchTasks

);



themeToggle.addEventListener(

    "click",

    toggleTheme

);

allFilter.addEventListener(

    "click",

    function(){

        filterTasks("all");

    }

);



activeFilter.addEventListener(

    "click",

    function(){

        filterTasks("active");

    }

);



completedFilter.addEventListener(

    "click",

    function(){

        filterTasks("completed");

    }

);



// =========================
// START APPLICATION
// =========================


loadTasks();

loadTheme();
