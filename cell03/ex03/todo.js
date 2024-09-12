function addTodo(text, addToTop = true) {
    const todoList = document.getElementById('ft_list');
    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';
    todoItem.innerText = text;

    todoItem.addEventListener('click', function () {
        const confirmDelete = confirm('Do you want to remove this task?');
        if (confirmDelete) {
            todoList.removeChild(todoItem);
            saveTodos();
        }
    });
    if (addToTop) {
        todoList.insertBefore(todoItem, todoList.firstChild);
    } else {
        todoList.appendChild(todoItem);
    }
    
    saveTodos();
}

function createNewTodo() {
    const todoText = prompt('Enter a new task:');
    if (todoText) {
        addTodo(todoText);
    }
}

function saveTodos() {
    const todos = [];
    document.querySelectorAll('#ft_list .todo-item').forEach(todo => {
        todos.push(todo.innerText);
    });

    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);

    document.cookie = `todos=${encodeURIComponent(JSON.stringify(todos))}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
}

function loadTodos() {
    const cookies = document.cookie.split('; ');
    const todoCookie = cookies.find(cookie => cookie.startsWith('todos='));
    if (todoCookie) {
        const todos = JSON.parse(decodeURIComponent(todoCookie.split('=')[1]));
        todos.forEach(todo => addTodo(todo, false));
    }
}

document.getElementById('new-todo').addEventListener('click', createNewTodo);

window.onload = loadTodos;
