let btnAddTask = document.querySelector(".btn-add-task");
btnAddTask.addEventListener("click", addTask);

let taskCounter = localStorage.getItem("taskCounter");

if (taskCounter === null) {
    taskCounter = 0;
    localStorage.setItem("taskCounter", taskCounter);
} else {
    taskCounter = parseInt(taskCounter);
}

function addTask() {
    let taskContent = document.getElementById("task");

    if (taskContent.value != "" && taskContent.value != undefined) {
        taskCounter++;
        localStorage.setItem("taskCounter", taskCounter);
        localStorage.setItem(`tarea${taskCounter}`, taskContent.value);

        Swal.fire({
            title: "Correcto",
            text: "Tarea guardada con éxito",
            icon: "success"
        });

        taskContent.value = "";
        showTasks();
    } else {
        Swal.fire({
            title: "Advertencia",
            text: "Por favor inserte una tarea",
            icon: "warning"
        });
    }
}

function showTasks() {
    let taskList = document.getElementById("task-list");

    if (taskCounter === 0) {
        taskList.innerHTML = "<p>No hay tareas asignadas</p>";
        return;
    }

    taskList.innerHTML = "";

    for (let i = 1; i <= taskCounter; i++) {
        let task = localStorage.getItem(`tarea${i}`);
        if (task !== null) {
            let isCompleted = localStorage.getItem(`completed${i}`) === "true";

            let taskItem = document.createElement("div");
            taskItem.classList.add("task-item");
            taskItem.setAttribute("data-id", i);

            if (isCompleted) {
                taskItem.classList.add("completed");
            }

            taskItem.innerHTML = `
                <span>${task}</span>
                <div class="task-buttons">
                    <button type="button" class="btn-delete-task" onclick="deleteTask(${i})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#fff" d="M7.616 20q-.691 0-1.153-.462T6 18.384V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.153T16.384 20zm2.192-3h1V8h-1zm3.384 0h1V8h-1z"/>
                        </svg>
                    </button>
                    <button type="button" class="btn-complete-task" onclick="completeTask(${i})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7L10 17l-5-5"/>
                        </svg>
                    </button>
                </div>
            `;
            taskList.appendChild(taskItem);
        }
    }
}


function deleteTask(id) {
    Swal.fire({
        title: "¿Estás seguro?", 
        text: "No podrás revertir esto",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {   
            localStorage.removeItem(`tarea${id}`);
            Swal.fire("Eliminado", "La tarea ha sido eliminada", "success");
            showTasks();
        }
    });
}

function completeTask(id) {
    let taskItem = document.querySelector(`.task-item[data-id="${id}"]`);

    if (!taskItem) return;
    taskItem.classList.toggle("completed");

    let isCompleted = taskItem.classList.contains("completed");
    localStorage.setItem(`completed${id}`, isCompleted);
}


showTasks();