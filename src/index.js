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

const todoArray = [
  {
    description: 'Go for a run',
    completed: false,
    index: 0,
  },
];

function addToDo() {
  if (todoInput.value !== '') {
  todoArray.push(
      {
        description: todoInput.value,
        completed: false,
        index: todoArray.length
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
      <p class="todo-text" id="${item.index}">${item.description}</p>
    </div>
    <div class ="dots-and-trash">
      <img class="dots-image" src="${dotsIcon}" alt="three dots image" />
      <img class="trash-image" src="${trashIcon}" alt="three dots image" />
    </div>
    </li>
    `;
  });
  todoContainer.innerHTML = todoHTML;
}

plusIcon.addEventListener('click', () => {
  addToDo();
  renderToDo();
});

todoInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    plusIcon.click();
  }
})

renderToDo();
