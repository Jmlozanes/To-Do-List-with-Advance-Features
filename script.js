// =========================
// VARIABLES
// =========================


let tasks = [];


// Get HTML elements

const taskInput = document.getElementById("taskInput");

const priority = document.getElementById("priority");

const dueDate = document.getElementById("dueDate");

const addTaskButton = document.getElementById("addTask");

const taskList = document.getElementById("taskList");



// =========================
// ADD TASK FUNCTION
// =========================


function addTask(){


    let taskText = taskInput.value;


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



        li.innerHTML = `


        <div>


        <h3>${task.title}</h3>


        <p>
        Priority: ${task.priority}
        </p>


        <p>
        Due Date: ${task.date || "No Date"}
        </p>



        </div>



        <button onclick="deleteTask(${task.id})">
        Delete
        </button>


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
// LOCAL STORAGE
// =========================


function saveTasks(){


    localStorage.setItem(

        "tasks",

        JSON.stringify(tasks)

    );


}




// =========================
// LOAD SAVED TASKS
// =========================


function loadTasks(){


    let savedTasks = localStorage.getItem("tasks");



    if(savedTasks){


        tasks = JSON.parse(savedTasks);


    }


    displayTasks();


}




// =========================
// BUTTON EVENT
// =========================


addTaskButton.addEventListener(

"click",

addTask

);



// Load data when page opens

loadTasks();
