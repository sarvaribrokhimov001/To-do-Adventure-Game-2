alert("Assalomu alaykum!");
alert("Dasturimizga xush kelibsiz!");

const addButton = document.querySelector('.add-task');
const randomButton = document.querySelector('.random-task');
const clearLastButton = document.querySelector('.clear-last');
const clearFirstButton = document.querySelector('.clear-first');
const uppercaseButton = document.querySelector('.uppercase__btn');

const taskList = document.querySelector('.task-list');
const taskNameInput = document.querySelector('input[type="text"]');
const levelSelect = document.querySelector('.levels');
const categoriesInput = document.querySelector('.categories');
const descriptionInput = document.querySelector('.description');

const stats = {
    total: 0,
    Easy: 0,
    Medium: 0,
    Hard: 0
};

// Tasks array as objects
let tasks = [];

// Update stats function
function updateStats() {
    document.querySelector('.right__container ul li:nth-child(1) span').textContent = stats.total;
    document.querySelector('.right__container ul li:nth-child(2) span').textContent = stats.Easy;
    document.querySelector('.right__container ul li:nth-child(3) span').textContent = stats.Medium;
    document.querySelector('.right__container ul li:nth-child(4) span').textContent = stats.Hard;
}

// Create task
function createTaskObject(taskName, level, categories, description) {
    const task = { taskName, level, categories, description };
    tasks.push(task);

    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
        <h4>${taskName} <span>[${level}]</span></h4>
        <p><strong>Categories:</strong> ${categories}</p>
        <p><strong>Description:</strong> ${description}</p>
    `;
    taskList.appendChild(taskItem);

    // Update stats
    stats.total++;
    stats[level]++;
    updateStats();
}

// ADD TASK
addButton.addEventListener('click', () => {
    const taskName = taskNameInput.value.trim();
    const level = levelSelect.value;
    const categories = categoriesInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!taskName || !level || !categories || !description) {
        alert("Bo'sh maydonni to'ldiring!");
        return;
    }

    createTaskObject(taskName, level, categories, description);

    taskNameInput.value = '';
    categoriesInput.value = '';
    descriptionInput.value = '';
});

// CLEAR LAST
clearLastButton.addEventListener('click', () => {
    if (tasks.length > 0) {
        const lastTask = tasks.pop();
        stats.total--;
        stats[lastTask.level]--;
        taskList.removeChild(taskList.lastElementChild);
        updateStats();
    }
});

// CLEAR FIRST
clearFirstButton.addEventListener('click', () => {
    if (tasks.length > 0) {
        const firstTask = tasks.shift();
        stats.total--;
        stats[firstTask.level]--;
        taskList.removeChild(taskList.firstElementChild);
        updateStats();
    }
});

// ALL UPPERCASE
uppercaseButton.addEventListener('click', () => {
    tasks.forEach((task, index) => {
        task.taskName = task.taskName.toUpperCase();
        const taskItem = taskList.children[index];
        taskItem.querySelector('h4').innerHTML = `${task.taskName} <span>[${task.level}]</span>`;
    });
});