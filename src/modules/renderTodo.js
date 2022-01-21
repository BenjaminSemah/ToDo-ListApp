/* eslint-disable no-unused-vars */

import TodoObject from './todoClass.js';
import dotsIcon from '../imgDots.svg';
import penIcon from '../imgPen.svg';
import trashIcon from '../imgTrash.svg';

export const newToDo = new TodoObject();
export const todoContainer = document.querySelector('.todo-list');

export const renderToDo = () => {
  let todoHTML = '';
  newToDo.todoArray.forEach((item) => {
    const defaultCompleted = (item.completed === true) ? 'checked' : '';

    todoHTML
    += `
    <li class="list-item">
      <div class="checkAndText">
        <input id="${item.completed}" class='checkbox' type="checkbox" ${defaultCompleted}/>
        <p class="todo-text">${item.description}</p>
      </div>
      <div class ="dots-and-trash">
        <img class="dots-image" src="${penIcon}" alt="three dots image" />
        <img class="trash-image" id="${item.index}" src="${trashIcon}" alt="three dots image" />
      </div>
    </li>
    `;
  });
  todoContainer.innerHTML = todoHTML;

  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach((box) => {
    if (box.checked) {
      box.nextElementSibling.classList.add('strikethrough');
    } else {
      box.nextElementSibling.classList.remove('strikethrough');
    }
  });
};