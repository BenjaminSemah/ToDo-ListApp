/* eslint-disable no-unused-vars */

//import _, { indexOf } from 'lodash';
import './style.css';


import { todoInput } from './modules/todoClass';
import { renderToDo, newToDo, todoContainer } from './modules/renderTodo';

const trashImage = document.querySelectorAll('.trash-image');
const dotsImage = document.querySelectorAll('.dots-image');
//const todoContainer = document.querySelector('.todo-list');
//const todoInput = document.querySelector('#add-todo-input');
const plusIcon = document.querySelector('.plusIcon') 

//let todoArray = localStorage.getItem('todoStorage') ? JSON.parse(localStorage.getItem('todoStorage')) : [];

function updateStorage() {
  newToDo.todoArray = newToDo.todoArray.filter((task, index) => {
    task.index = index + 1;
    return task;
  })
  localStorage.setItem('todoStorage', JSON.stringify(newToDo.todoArray));
}

// function addToDo() {
//   const todoId = todoArray.length;
//   if (todoInput.value !== '') {
//   todoArray.push(
//       {
//         description: todoInput.value,
//         completed: false,
//         index: todoId,
//       }
//     )
//     todoInput.value = '';
//   }
// }

// function renderToDo() {
//   let todoHTML = '';
//   todoArray.forEach((item) => {
//   todoHTML+= 
//     `
//     <li class="list-item">
//       <div class="checkAndText">
//         <input id="${item.completed}" class="checkbox" type="checkbox" />
//         <p class="todo-text">${item.description}</p>
//       </div>
//       <div class ="dots-and-trash">
//         <img class="dots-image" src="${dotsIcon}" alt="three dots image" />
//         <img class="trash-image" id="${item.index}" src="${trashIcon}" alt="three dots image" />
//       </div>
//     </li>
//     `;
//   });
//   todoContainer.innerHTML = todoHTML;
// }

// function removeToDo(icon) {
//   icon.parentNode.parentNode.remove();
// }

plusIcon.addEventListener('click', () => {
  newToDo.addToDo();
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
    newToDo.todoArray = newToDo.todoArray.filter(task => task.description !== title);
    newToDo.removeToDo(item);
    updateStorage();
  }
});


todoContainer.addEventListener('click', event => {
  const text = event.target;
  const textParent = text.parentNode.parentNode
  const textEdit = textParent.querySelector('.todo-text');
  if (text.className === "dots-image") {
    const originalText = text.parentNode.parentNode.querySelector('.todo-text').innerHTML;
    const index = newToDo.todoArray.map(task => task.description).indexOf(originalText);
    let updatedText = '';
    textEdit.contentEditable = true;
    textEdit.addEventListener('input', () => {
      updatedText = textEdit.innerHTML;
      if (updatedText !== originalText) {
        newToDo.todoArray[index].description = updatedText;
        newToDo.todoArray = newToDo.todoArray.filter(task => {
          return (task.id !== index)
        });
        updateStorage();
      }
    })
  }
})

renderToDo();
