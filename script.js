// =========================
// VARIABLES
// =========================


let tasks = [];


const taskInput = document.getElementById("taskInput");

const priority = document.getElementById("priority");

const dueDate = document.getElementById("dueDate");

const addTaskButton = document.getElementById("addTask");

const taskList = document.getElementById("taskList");

const themeToggle = document.getElementById("themeToggle");



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



    taskInput.value="";

    dueDate.value="";


}



// =========================
// DISPLAY TASKS
// =========================


function displayTasks(){


    taskList.innerHTML="";



    tasks.forEach(function(task){



        let li = document.createElement("li");



        if(task.completed){

            li.classList.add("completed");

        }



        li.innerHTML = `


        <div>


            <h3 onclick="completeTask(${task.id})">

            ${task.title}

            </h3>


            <p>
            Priority: ${task.priority}
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



    if(newTitle){


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


    let saved = localStorage.getItem("tasks");



    if(saved){


        tasks = JSON.parse(saved);


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


    let theme = localStorage.getItem("theme");



    if(theme === "dark"){


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



themeToggle.addEventListener(

    "click",

    toggleTheme

);




// =========================
// START APP
// =========================


loadTasks();

loadTheme();
