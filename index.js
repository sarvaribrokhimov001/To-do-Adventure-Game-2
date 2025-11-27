alert("Assalomu alaykum");
alert("Dasturimizga xush kelibsiz ! ");

        // HTML elementlarni chaqirish qismi 
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

const Levels = {
    total: 0,
    Easy: 0,
    Medium: 0,
    Hard: 0
};

// Array ga elementlar qo'shish 
let tasks = [];

// Level larni upDate qilish
function updateLevels() {
    document.querySelector('.right__container ul li:nth-child(1) span').textContent = Levels.total;
    document.querySelector('.right__container ul li:nth-child(2) span').textContent = Levels.Easy;
    document.querySelector('.right__container ul li:nth-child(3) span').textContent = Levels.Medium;
    document.querySelector('.right__container ul li:nth-child(4) span').textContent = Levels.Hard;
}

// Task yaratish qismi 
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

    // Level larni Update qilish (ya'ni increment qilib 1 ni qo'shib ketish)
    Levels.total++;
    Levels[level]++;
    updateLevels();
}

// ADD TASK button (Task qo'shadi)
addButton.addEventListener('click', () => {
    const taskName = taskNameInput.value.trim();
    const level = levelSelect.value;
    const categories = categoriesInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!taskName || !level || !categories || !description) {
        alert("Bo'sh maydonni to'ldiring !");
        return;
    }

    createTaskObject(taskName, level, categories, description);

    taskNameInput.value = '';
    categoriesInput.value = '';
    descriptionInput.value = '';
});

// CLEAR LAST button (oxirgi taskni o'chiradi)
clearLastButton.addEventListener('click', () => {
    if (tasks.length > 0) {
        const lastTask = tasks.pop();
        Levels.total--;
        Levels[lastTask.level]--;
        taskList.removeChild(taskList.lastElementChild);
        updateLevels();
    }
});

// CLEAR FIRST button (dastlabki taskni o'chiradi)
clearFirstButton.addEventListener('click', () => {
    if (tasks.length > 0) {
        const firstTask = tasks.shift();
        Levels.total--;
        Levels[firstTask.level]--;
        taskList.removeChild(taskList.firstElementChild);
        updateLevels();
    }
});

// ALL UPPERCASE button (task nomidagi barcha index dagi belgilarni katta harf qilish jarayoni)
uppercaseButton.addEventListener('click', () => {
    tasks.forEach((task, index) => {
        task.taskName = task.taskName.toUpperCase();
        const taskItem = taskList.children[index];
        taskItem.querySelector('h4').innerHTML = `${task.taskName} <span>[${task.level}]</span>`;
    });
});

// classList → elementdagi classlarni qo‘shish, o‘chirish, almashtirish va tekshirish imkonini beradi.
// forEach -> Array elementlarini birma-bir ko‘rib chiqib, ularga biror amal bajarish uchun ishlatiladi.
// arraydagi har bir elementni qayta ishlash uchun ishlatiladi, lekin yangi array yaratmaydi.