// =========================
// VARIABLES
// =========================


let tasks = [];

let currentFilter = "all";


const taskInput = document.getElementById("taskInput");

const priority = document.getElementById("priority");

const dueDate = document.getElementById("dueDate");

const addTaskButton = document.getElementById("addTask");

const taskList = document.getElementById("taskList");

const searchInput = document.getElementById("searchInput");

const themeToggle = document.getElementById("themeToggle");

const allFilter = document.getElementById("allFilter");

const activeFilter = document.getElementById("activeFilter");

const completedFilter = document.getElementById("completedFilter");

const clearCompleted = document.getElementById("clearCompleted");

const totalTasks = document.getElementById("totalTasks");

const completedTasks = document.getElementById("completedTasks");

const pendingTasks = document.getElementById("pendingTasks");



// =========================
// ADD TASK
// =========================


function addTask(){


    let taskText = taskInput.value.trim();



    if(taskText === ""){

        alert("Please enter a task");

        return;

    }



    let task = {


        id: Date.now(),

        title: taskText,

        priority: priority.value,

        date: dueDate.value,

        completed:false


    };



    tasks.push(task);



    saveTasks();


    displayTasks();


    updateDashboard();



    taskInput.value="";

    dueDate.value="";


}



// =========================
// DISPLAY TASKS
// =========================


function displayTasks(){


    taskList.innerHTML="";



    let displayList = [...tasks];



    // SEARCH

    let searchValue = searchInput.value.toLowerCase();



    displayList = displayList.filter(function(task){


        return task.title
        .toLowerCase()
        .includes(searchValue);


    });



    // FILTER

    if(currentFilter === "active"){


        displayList = displayList.filter(function(task){


            return task.completed === false;


        });


    }



    if(currentFilter === "completed"){


        displayList = displayList.filter(function(task){


            return task.completed === true;


        });


    }



    // SORT PRIORITY

    let priorityOrder = {


        High:1,

        Medium:2,

        Low:3


    };



    displayList.sort(function(a,b){


        return priorityOrder[a.priority] -

        priorityOrder[b.priority];


    });





    if(displayList.length === 0){


        taskList.innerHTML = `

        <p class="empty-message">

        No tasks available 🎉

        </p>

        `;


        return;


    }




    displayList.forEach(function(task){



        let li = document.createElement("li");



        if(task.completed){


            li.classList.add("completed");


        }




        li.innerHTML = `



        <div>


            <h3 onclick="completeTask(${task.id})">

            ${task.title}

            </h3>



            <div class="task-details">


                <span class="priority ${task.priority.toLowerCase()}">

                ${task.priority}

                </span>



                <span>

                📅 ${task.date || "No Date"}

                </span>



            </div>



        </div>





        <div>


            <button 
            class="edit-btn"
            onclick="editTask(${task.id})">

            Edit

            </button>




            <button 
            class="delete-btn"
            onclick="deleteTask(${task.id})">

            Delete

            </button>



        </div>



        `;



        taskList.appendChild(li);



    });


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
// DELETE TASK
// =========================


function deleteTask(id){



    let confirmDelete = confirm(

        "Are you sure you want to delete this task?"

    );



    if(confirmDelete){



        tasks = tasks.filter(function(task){


            return task.id !== id;


        });



        saveTasks();


        displayTasks();


        updateDashboard();



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


    updateDashboard();


}



// =========================
// FILTER TASKS
// =========================


function filterTasks(type){


    currentFilter = type;


    displayTasks();


}



// =========================
// CLEAR COMPLETED
// =========================


function clearCompletedTasks(){



    tasks = tasks.filter(function(task){


        return task.completed === false;


    });



    saveTasks();


    displayTasks();


    updateDashboard();


}



// =========================
// DASHBOARD
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

    displayTasks

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



clearCompleted.addEventListener(

    "click",

    clearCompletedTasks

);



// =========================
// START APPLICATION
// =========================


loadTasks();

loadTheme();

displayTasks();

updateDashboard();
