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
  todoArray = todoArray.filter((task, index) => {
    task.index = index + 1;
    return task;
  })
  localStorage.setItem('todoStorage', JSON.stringify(todoArray));
  renderToDo();
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
  const title = item.parentNode.parentNode.querySelector('.todo-text').textContent;
  if (itemIndex !== '' && itemIndex !== "false" && itemIndex !== "true") {
    todoArray = todoArray.filter(task => task.description !== title);
    removeToDo(item);
    updateStorage()
  }
});

todoContainer.addEventListener('click', event => {
  const text = event.target;
  const textEdit = text.parentNode.parentNode.querySelector('.todo-text');
  const originalText = text.parentNode.parentNode.querySelector('.todo-text').innerHTML;
  let updatedText = '';
  if (text.className === "dots-image") {
    textEdit.contentEditable = true;
    textEdit.addEventListener('input', () => {
      updatedText = textEdit.innerHTML;
      console.log(originalText);
      console.log(updatedText);
      if (updatedText !== originalText) {
        console.log('There is a task update!');
      }
    })
  }
  //textEdit.contentEditable = false;
})

renderToDo();
