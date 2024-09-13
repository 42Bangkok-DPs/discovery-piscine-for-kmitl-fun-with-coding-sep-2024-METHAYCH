$(document).ready(function() {
    function addTodo(text, addToTop = true) {
        const $todoList = $('#ft_list');
        const $todoItem = $('<div class="todo-item"></div>').text(text);

        $todoItem.on('click', function() {
            if (confirm('Do you want to remove this task?')) {
                $todoItem.remove();
                saveTodos();
            }
        });

        if (addToTop) {
            $todoList.prepend($todoItem);
        } else {
            $todoList.append($todoItem);
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
        $('#ft_list .todo-item').each(function() {
            todos.push($(this).text());
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

    $('#new-todo').on('click', createNewTodo);

    loadTodos();
});
