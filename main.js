var todosArr = [];
const todos = JSON.parse(localStorage.getItem('todos'));
const todoList = document.getElementsByClassName('todo-list')[0];
let currentCategory = 'Alle';
window.onload = () => {
  if (todos) {
    todosArr = todos;
  }
  listTodos();
};
const addTodo = () => {
  const todoValue = document.getElementsByName('todo')[0].value;
  const categoryValue = document.getElementsByName('category')[0].value;
  if (todoValue === '' || categoryValue === '') {
    return;
  }

  if (todosArr.length === 0) {
    todosArr.push({ id: 0, todo: todoValue, category: categoryValue });
    localStorage.setItem('todos', JSON.stringify([...todosArr]));
    listTodos();
  } else {
    if (todoValue === todosArr.filter((val) => val.todo === todoValue)[0]?.todo) {
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
      category: categoryValue
    });
    localStorage.setItem('todos', JSON.stringify([...todosArr]));
    listTodos();
    }

  }
};

const deleteTodo = (el) => {
  const todoText = el.parentElement.parentElement.innerText;
  console.log(todoText);


  if (todoText === todosArr.filter((val) => val.todo === todoText)[0]?.todo) {
    console.log('test');
    let index = todosArr.findIndex((val) => val.todo === todoText);
    todosArr.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify([...todosArr]));
    listTodos();
  }

}

const completedTodo = (el) => {
  const todoText = el.parentElement.parentElement.innerText;
  const todos = JSON.parse(localStorage.getItem('todos'));
  const index = todos.findIndex((val) => val.todo === todoText);
  todos[index].category = 'Voltooid';
  localStorage.setItem('todos', JSON.stringify([...todos]));
  listTodos();
};

const categoryFilter = (category) => {

  const todos = JSON.parse(localStorage.getItem('todos'));
  console.log(todos[0].category === category);
  currentCategory = category;
  if (category === 'Alle') {
    todosArr = todos;
    listTodos();
    return;
  }
  const filteredTodos = todos.filter((todo) => todo.category === category);
  console.log(filteredTodos);

  todosArr = filteredTodos;
  console.log({todosArr});
  listTodos();
};

const listTodos = () => {
  todoList.innerHTML = '';
  todoList.innerHTML += `<h2 class="category-title">${currentCategory}</h2>`
  if (todosArr.length === 0) {
    todoList.innerHTML = `<h2 class="category-title">${currentCategory}</h2>`
    todoList.innerHTML += '<p class="no-task">Geen taken gevonden</p>';
  }

  todosArr.forEach((todo) => {
    const li = document.createElement('li');
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
    todoList.appendChild(li);
  });

  document.getElementsByClassName('container')[0].appendChild(todoList);

};

const toggleMenu = () => {
  const menu = document.getElementsByClassName('menu')[0];
  menu.classList.toggle('active');
};

