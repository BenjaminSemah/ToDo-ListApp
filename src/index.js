/* eslint-disable no-unused-vars */

import _ from 'lodash';
import './style.css';
import dotsIcon from './imgDots.svg';
import trashIcon from './imgTrash.svg';

const trashImage = document.querySelectorAll('.trash-image');
const dotsImage = document.querySelectorAll('.dots-image');
const todoContainer = document.querySelector('.todo-list');
const todoInput = document.querySelector('#add-todo-input');
const plusIcon = document.querySelector('.plusIcon') 

let todoArray = localStorage.getItem('todoStorage') ? JSON.parse(localStorage.getItem('todoStorage')) : [];

function updateStorage() {
  localStorage.setItem('todoStorage', JSON.stringify(todoArray));
}

function addToDo() {
  const todoId = todoArray.length;
  if (todoInput.value !== '') {
  todoArray.push(
      {
        description: todoInput.value,
        completed: false,
        index: todoId,
      }
    )
    todoInput.value = '';
  }
}

function renderToDo() {
  let todoHTML = '';
  todoArray.forEach((item) => {
  todoHTML+= 
    `
    <li class="list-item">
      <div class="checkAndText">
        <input id="${item.completed}" class="checkbox" type="checkbox" />
        <p class="todo-text">${item.description}</p>
      </div>
      <div class ="dots-and-trash">
        <img class="dots-image" src="${dotsIcon}" alt="three dots image" />
        <img class="trash-image" id="${item.index}" src="${trashIcon}" alt="three dots image" />
      </div>
    </li>
    `;
  });
  todoContainer.innerHTML = todoHTML;
}

function removeToDo(icon) {
  icon.parentNode.parentNode.remove();
}

plusIcon.addEventListener('click', () => {
  addToDo();
  renderToDo();
  updateStorage();
});

todoInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    plusIcon.click();
  }
})

todoContainer.addEventListener('click', (event) => {
  const item = event.target;
  const itemIndex = item.id;
  if (itemIndex !== '' && itemIndex !== "false" && itemIndex !== "true") {
    console.log("Test Works!")
    todoArray = todoArray.filter((task) => todoArray.indexOf(task) !== Number(itemIndex));
  }
})

renderToDo();
