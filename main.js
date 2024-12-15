var todosArr = [];
const todos = JSON.parse(localStorage.getItem('todos'));
const todoList = document.getElementsByClassName('todo-list')[0];
var currentCategory = 'Alle';
var darkmode = true;
var completed = false;

window.onload = () => {
  if (todos) {
    todosArr = todos;
  }
  toggleDarkMode();
  listTodos();
};
const addTodo = () => {
  const todoValue = document.getElementsByName('todo')[0].value.trim();
  const categoryValue = document.getElementsByName('category')[0].value.trim();
  if (todoValue === '' || categoryValue === '') {
    return;
  }

  if (todosArr.length === 0) {
    todosArr.push({
      id: 0,
      todo: todoValue,
      category: categoryValue,
      voltooid: false
    });

    localStorage.setItem('todos', JSON.stringify([...todosArr]));
    listTodos();
  } else {
    // Check if todo already exists
    if (
      todoValue === todosArr.filter((val) => val.todo === todoValue)[0]?.todo
    ) {
      let toast = document.createElement('section');
      toast.innerHTML = `<p>De taak: ${todoValue} bestaat al</p>`;
      toast.classList.add('toast');
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.style.display = 'none';
      }, 2000);
      return;
    } else {
      todosArr.push({
        id: todosArr[todosArr.length - 1].id + 1,
        todo: todoValue,
        category: categoryValue,
        voltooid: false
      });
    }
    localStorage.setItem('todos', JSON.stringify([...todosArr]));
    listTodos();
  }
};
const deleteTodo = (el) => {
  const todoItem = el.closest('.todo-item');
  const todoText = todoItem.innerText;

  if (todoText === todosArr.filter((val) => val.todo === todoText)[0]?.todo) {
    todoItem.classList.add('remove-todo');

    todosArr = todosArr.filter((val) => val.todo !== todoText);
    localStorage.setItem('todos', JSON.stringify([...todosArr]));
    listTodos();
  }
};
const completedTodo = (el) => {
  const todoText = el.parentElement.parentElement.innerText;
  const todos = JSON.parse(localStorage.getItem('todos'));
  const index = todos.findIndex((val) => val.todo === todoText);
  todos[index].voltooid = true;
  localStorage.setItem('todos', JSON.stringify([...todos]));
  listTodos();
};

const categoryFilter = (category) => {
    completed = false;

  const todos = JSON.parse(localStorage.getItem('todos'));

  currentCategory = category;
  if (category === 'Alle') {
    todosArr = todos;
    listTodos();
    return;
  }
  const filteredTodos = todos.filter((todo) => todo.category === category);
  if (filteredTodos.length === 0) {
    todoList.innerHTML = '<p class="no-task">Geen taken gevonden</p>';
    return;
  }
  todosArr = filteredTodos;

  listTodos();
};

const showCompleted = () => {
  completed = true;
  console.log('showCompleted');
  const todos = JSON.parse(localStorage.getItem('todos'));
  const completedTodos = todos.filter((todo) => todo.voltooid !== false);
  console.log({ completedTodos, todos });
  todosArr = completedTodos;
  console.log({ todosArr });

  listTodos();
};
const showAll = () => {
  completed = false;
  const todos = JSON.parse(localStorage.getItem('todos'));
  todosArr = todos;
  listTodos();
};

const groupTodos = (todos) => {
  let groupedTodos = todos.reduce((acc, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = [];
    }
    acc[curr.category].push(curr);
    return acc;
  }, {});

  return groupedTodos;
};
const createTodoItem = (todo) => {
  const li = document.createElement('li');
  li.setAttribute('data-todo-id', todo.id);
  li.classList.add('todo-item');
  li.innerHTML = `<p>${todo.todo}</p>
          <section class="buttons">
            <button class="checkmark" onclick="completedTodo(this)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
              >
                <path
                  d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"
                />
              </svg>
            </button>
            <button class="delete-button" onclick="deleteTodo(this)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
              >
                <path
                  d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                />
              </svg>
            </button>
          </section>`;
  return li;
};

const listTodos = () => {
  console.log('completed', completed);

  todoList.innerHTML = '';
  if (completed) {


    todosArr.forEach((todo) => {
      if (todo.voltooid === true) {
        const li = createTodoItem(todo);
        todoList.appendChild(li);
      }
    });
  } else {
    // check if you are in the all category
    if (currentCategory === 'Alle') {
      // check if there are no todos
      if (todosArr.length === 0) {
        todoList.innerHTML += '<p class="no-task">Geen taken gevonden</p>';
      } else {
        console.log('groupedTodos');
        let groupedTodo = groupTodos(todosArr);
        Object.entries(groupedTodo).forEach(([categories, todos]) => {
          console.log({ categories, todos });

            const h2 = document.createElement('h2');
            h2.classList.add('category-title-sm');
            h2.innerText = categories;
            todoList.appendChild(h2);

            todos.forEach((todo) => {
              const li = createTodoItem(todo);
              todoList.appendChild(li);
            });


        });
      }
    } else {
      let h2 = document.createElement('h2');
      h2.classList.add('category-title-sm');
      h2.innerText = currentCategory;
      todosArr.forEach((todo) => {
        if (todo.voltooid !== true) {
          const li = createTodoItem(todo);
          todoList.appendChild(li);
        }
      });
    }
    document.getElementsByClassName('todo-container')[0].appendChild(todoList);
  }
};

const toggleMenu = () => {
  const menu = document.getElementsByClassName('menu')[0];
  menu.classList.toggle('active');
};

const toggleDarkMode = () => {
  const body = document.body;
  darkmode
    ? localStorage.setItem('darkmode', JSON.stringify(false))
    : localStorage.setItem('darkmode', JSON.stringify(true));

  if (darkmode) {
    body.classList.remove('light');
    body.classList.add('dark');
    darkmode = false;
  } else {
    body.classList.remove('dark');
    body.classList.add('light');
    darkmode = true;
  }
};
