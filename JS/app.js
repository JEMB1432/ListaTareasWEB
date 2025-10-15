
let btnAddTask = document.querySelector(".btn-add-task");
btnAddTask.addEventListener("click", addTask)

let taskCounter = localStorage.getItem("taskCounter")

function addTask(){
    let taskContent = document.getElementById("task");
    if(taskCounter == null){
        localStorage.setItem("taskCounter", 0)
        taskContent = 0
    }
    console.log(taskContent.value)

    if(taskContent.value != "" || taskContent.value != undefined){
        taskCounter++;
        localStorage.setItem("taskCounter", taskCounter);
        localStorage.setItem(`tarea${taskCounter}`, taskContent.value);
        Swal.fire({
            title: "Correcto",
            text: "Tarea guardada con exito",
            icon: "success"
        });
        taskContent.value = ""
    }else{
        Swal.fire({
            title: "Advertencia",
            text: "Por favor inserte una tarea",
            icon: "warning"
        });
    }
}

function showTasks(){
    
}