document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // ✅ Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => {
            createTaskElement(taskText);
        });
    }

    // ✅ Save tasks to localStorage
    function saveTasks() {
        const allTasks = [];
        const taskItems = taskList.querySelectorAll('li');
        taskItems.forEach(item => {
            const taskText = item.firstChild.textContent.trim();
            allTasks.push(taskText);
        });
        localStorage.setItem('tasks', JSON.stringify(allTasks));
    }

    // ✅ Create and add <li> task
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        removeBtn.onclick = function () {
            taskList.removeChild(li);
            saveTasks();
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // ✅ Add a new task and save
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        createTaskElement(taskText);
        saveTasks();
        taskInput.value = '';
    }

    // ✅ Button click event
    addButton.addEventListener('click', addTask);

    // ✅ Press Enter to add task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // ✅ Load saved tasks on page load
    loadTasks();
});
