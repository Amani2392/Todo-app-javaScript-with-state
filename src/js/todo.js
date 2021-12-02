const app = document.querySelector('#root');

const state = {
  tasks: [],
};

const header = document.createElement('div');
header.setAttribute('class', 'header');
const mainHeader = document.createElement('h1');
mainHeader.innerText = 'To Do List';
header.append(mainHeader);

const formContainer = document.createElement('form');
const input = document.createElement('input');
input.setAttribute('type', 'text');
input.setAttribute('placeholder', 'Task..');
input.setAttribute('class', 'input-field');
formContainer.append(input);

const addButton = document.createElement('button');
addButton.setAttribute('class', 'add-button');
addButton.setAttribute('type', 'submit');
addButton.innerHTML = 'Add';
formContainer.append(addButton);

const todoContainer = document.createElement('div');
todoContainer.setAttribute('class', 'todo-container');
const listContainer = document.createElement('ul');
listContainer.setAttribute('class', 'todo-list');
todoContainer.append(listContainer);

app.append(header);
app.append(formContainer);
app.append(todoContainer);

const todoInput = document.querySelector('.input-field');
const todoButton = document.querySelector('.add-button');
const todoList = document.querySelector('.todo-list');

const storeAddedItem = () => {
  state.tasks.push(todoInput.value);
  localStorage.setItem('todos', JSON.stringify(state.tasks));
};
todoButton.addEventListener('click', (event) => {
  event.preventDefault();
  const todoDiv = document.createElement('div');
  todoDiv.setAttribute('class', 'todo-div');

  const newTodo = document.createElement('li');
  newTodo.setAttribute('class', 'list-item');
  newTodo.innerText = todoInput.value;
  newTodo.setAttribute('class', 'todo-item');
  todoDiv.appendChild(newTodo);

  const removeButton = document.createElement('button');
  removeButton.innerText = 'Remove';
  removeButton.setAttribute('class', 'remove-button');
  todoDiv.appendChild(removeButton);
  todoList.appendChild(todoDiv);
  storeAddedItem(todoInput.value);
  todoInput.value = '';
});

const unStoreDeletedItem = (todo) => {
  state.tasks = [];
  if (localStorage.getItem('todos') === null) {
    state.tasks = [];
  } else {
    state.tasks = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  state.tasks.splice(state.tasks.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(state.tasks));
};

todoList.addEventListener('click', (e) => {
  const listItem = e.target;
  if (listItem.classList[0] === 'remove-button') {
    const todo = listItem.parentElement;
    todo.remove();
    unStoreDeletedItem(todo);
  }
  const done = listItem.parentElement;
  done.classList.toggle('done');
  const array = document.querySelectorAll('.todo-div');
  const els = [].slice.call(array);
  els.forEach((task) => task.addEventListener('click', () => task.parentNode.appendChild(task)));
});
