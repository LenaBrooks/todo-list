const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");

    if (todo.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <span>${todo.title}</span>
      <button class="delete">Delete</button>
    `;

    li.querySelector("span").addEventListener("click", () => {
      todo.completed = !todo.completed;
      saveTodos();
      renderTodos();
    });

    li.querySelector(".delete").addEventListener("click", () => {
      todos = todos.filter((item) => item.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    todoList.appendChild(li);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = input.value.trim();

  if (!title) return;

  todos.push({
    id: Date.now(),
    title,
    completed: false,
  });

  input.value = "";

  saveTodos();
  renderTodos();
});

renderTodos();
