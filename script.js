document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // render tasks saved in localStorage
  tasks.forEach(task => renderTask(task));

  // add new task
  addTaskButton.addEventListener('click', () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTask(newTask); // <-- ✅ show the new task immediately
    todoInput.value = "";
  });

  function renderTask(task) {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);

    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
      <span>${task.text}</span>
      <button>Delete</button>
    `;

    // toggle completion when li (but not button) is clicked
    li.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') return;
      task.completed = !task.completed;
      li.classList.toggle('completed');
      saveTasks();
    });

    // delete button
    li.querySelector('button').addEventListener('click', (e) => {
      e.stopPropagation(); // prevent toggle
      tasks = tasks.filter(t => t.id !== task.id);
      li.remove();
      saveTasks();
    });

    todoList.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});