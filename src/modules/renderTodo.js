/* eslint-disable no-unused-vars */

import TodoObject from './todoClass.js';
import dotsIcon from '../imgDots.svg';
import trashIcon from '../imgTrash.svg';

export const newToDo = new TodoObject();
export const todoContainer = document.querySelector('.todo-list');

export const renderToDo = () => {
  let todoHTML = '';
  newToDo.todoArray.forEach((item) => {
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