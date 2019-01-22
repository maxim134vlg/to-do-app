//Определение переменных в UI
var form = document.querySelector('#task-form');
var taskList = document.querySelector('.collection');
var clearBtn = document.querySelector('.clear-tasks');
var filter = document.querySelector('#filter');
var taskInput = document.querySelector('#task');

// загрузка прослушивателя событий
loadEventListeners();

function loadEventListeners(){
    // Загрузка DOM события
    document.addEventListener('DOMContentLoaded', getTasks);
    // Добавление события
    form.addEventListener('submit', addTask);
    //Удаление события
    taskList.addEventListener('click', removeTask);
    //Удаление всех событий
    clearBtn.addEventListener('click', clearTasks);
    //Фильтр событий
    filter.addEventListener('keyup', filterTasks);
}

// Загрузка задач из Local Storage
function getTasks(){
    var tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        //Создаем элемент li
        var li = document.createElement('li');
        //Добавляем класс
        li.className = 'collection-item';
        // Добавление текста
        li.appendChild(document.createTextNode(task));
        // Создание новой ссылки
        var link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        // добавление иконки
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //добавление ссылки к li
        li.appendChild(link);
        // добавление li to ul
        taskList.appendChild(li);
    });
}

// Добавление задания
function addTask(e){
    if (taskInput.value === '') {
        alert('Add your task!');
    }
    //Создаем элемент li
    var li = document.createElement('li');
    //Добавляем класс
    li.className = 'collection-item';
    // Добавление текста
    li.appendChild(document.createTextNode(taskInput.value));
    // Создание новой ссылки
    var link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // добавление иконки
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //добавление ссылки к li
    li.appendChild(link);
    // добавление li to ul
    taskList.appendChild(li);

    // Работа с локальной памятью
    storeTaskInLocalStorage(taskInput.value);

    // очистка формы
    taskInput.value = '';

    e.preventDefault();
}

// Сохранение задачи
function storeTaskInLocalStorage(task){
    var tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Удаление задачи
function removeTask(e){
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();

            // Удаление из ЛП
            removeFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Удаление из ЛП.
function removeFromLocalStorage(taskItem){
    var tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Удаление всех задач
function clearTasks(e){
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Фильтр задач
function filterTasks(e){
    var text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        var item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}