// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")

// event listeners
document.addEventListener("DOMContentLoaded", loadToDoLocal);
document.addEventListener("DOMContentLoaded", loadCompletedLocal);
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterToDo);

// trial ground
console.log(todoList.children.HTMLCollection);


// functions

function addToDo(event) {
    // Prevent form from submotting
    event.preventDefault();
    // console.log("button click registered.");
    //creating the todo div
    const todoDiv = document.createElement("DIV");
    todoDiv.classList.add("todo");
    // creating the todo li
    const newToDo = document.createElement("LI");
    newToDo.innerText= todoInput.value;
    newToDo.classList.add("todo-item");
    // creating the delete button with the icon
    const deleteButton = document.createElement("BUTTON");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.classList.add("delete-button");
    // creating the checked button with the icon
    const checkedButton = document.createElement("BUTTON");
    checkedButton.innerHTML = '<i class="fas fa-check"></i>';
    checkedButton.classList.add("checked-button");
    // attaching the buttons to the todo div
    todoDiv.appendChild(checkedButton);
    // attaching li to the todo div
    todoDiv.appendChild(newToDo);
    todoDiv.appendChild(deleteButton);
    // attaching the todo Div to the list
    todoList.appendChild(todoDiv);
    // add todo to the local localStorage
    SaveToDoLocal(todoInput.value);
    //clear todoInput value
    todoInput.value = "";

    // console.log(todoList.childNodes);
}

function deleteCheck(event){
    const item = event.target;

    // delete TODO:
    if(item.classList[0] === "delete-button"){
        const todo = item.parentElement;
        // animation
        todo.classList.add("fall");
        if(todo.classList.contains("completed")){
            removeCompletedLocal(todo);
        }
        removeToDoLocal(todo);

        // transitionend waits for the transition to complete and then execute the function
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }
    if(item.classList[0] === "checked-button"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        if(todo.classList.contains("completed")){
            // enter data into completedTodos
            SaveCompletedLocal(todo);
            // console.log(todo);
            // console.log("saved to cmpleted list");
        }
        else{
            // remove data from completedTodos
            removeCompletedLocal(todo);
            // console.log("removed from the completed list");
        }
    }
}

// function for filter
function filterToDo(event){
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        if( todo.classList !== "undefined"){
            switch(event.target.value){
                case "all":
                    todo.style.display = "flex";
                    break;
                case "checked":
                    if(todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    }
                    else{
                        todo.style.display = "none";
                    }
                    break;
                case "unchecked":
                    if(todo.classList.contains("completed")){
                        todo.style.display = "none" ;
                    }
                    else{
                        todo.style.display = "flex";
                    }
            }
        }
    });
}
// saving a todo to local storage
function SaveToDoLocal(todo){
    // check: if a to-do has already been Saved
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
//saving into the completed todo list
function SaveCompletedLocal(todo){
    let completedTodos;
    if(localStorage.getItem('completedTodos') === null){
        completedTodos = [];
    }
    else{
        completedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    }
    completedTodos.push(todo.children[0].innerHTML);
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
}
// loading todo from local storage
function loadToDoLocal(todo){
    // check: if a to-do has already been Saved
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    let completedTodos;
    if(localStorage.getItem('completedTodos') === null){
        completedTodos = [];
    }
    else {
        completedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    }
    todos.forEach((todo) => {
        const todoDiv = document.createElement("DIV");
        todoDiv.classList.add("todo");
        if(completedTodos.includes(todo)){
            todoDiv.classList.add("completed");
        }
        // creating the todo li
        const newToDo = document.createElement("LI");
        newToDo.innerText= todo;
        newToDo.classList.add("todo-item");
        // creating the delete button with the icon
        const deleteButton = document.createElement("BUTTON");
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.classList.add("delete-button");
        // creating the checked button with the icon
        const checkedButton = document.createElement("BUTTON");
        checkedButton.innerHTML = '<i class="fas fa-check"></i>';
        checkedButton.classList.add("checked-button");
        // attaching the buttons to the todo div
        todoDiv.appendChild(checkedButton);
        // attaching li to the todo div
        todoDiv.appendChild(newToDo);
        todoDiv.appendChild(deleteButton);
        // attaching the todo Div to the list
        todoList.appendChild(todoDiv);
    })

}

function loadCompletedLocal(todo){
    let compDivLocal;
    if(localStorage.getItem('compDivLocal') === null){
        compDivLocal = [];
    }
    else{
        compDivLocal = JSON.parse(localStorage.getItem('compDivLocal'));
    }
    compDivLocal.forEach((todo) =>{
        console.log(todo);
        todo.classList.toggle("completed");
    })
}

// localStorage and delete link
function removeToDoLocal(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todos.indexOf(todo.children[0].innerHTML);
    console.log(todo);
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));

}
// remove todo from completed list
function removeCompletedLocal(todo){
    let completedTodos;
    let compDivLocal;
    if(localStorage.getItem('completedTodos') === null){
        completedTodos = [];
    }
    else{
        completedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    }
    const compIndex = completedTodos.indexOf(todo.children[0].innerHTML);
    completedTodos.splice(compIndex, 1);
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));

    if(localStorage.getItem('compDivLocal') === null){
        compDivLocal = [];
    }
    else{
        compDivLocal = JSON.parse(localStorage.getItem('compDivLocal'));
    }
    compDivLocal.splice(compIndex, 1);
    localStorage.setItem('compDivLocal', JSON.stringify(compDivLocal));
}
// local storage and checked link
function checkToDoLocal(todo){
    let completedTodos;
    if(localStorage.getItem('completedTodos') === null){
        completedTodos = [];
    }
    else{
        completedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    }
}
