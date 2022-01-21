/* eslint-disable no-unused-vars */
import './style.css';
import { todoInput } from './modules/todoClass.js';
import { renderToDo, newToDo, todoContainer } from './modules/renderTodo.js';

const clearBtn = document.querySelector('#clear-all-text');
const plusIcon = document.querySelector('.plusIcon');

function updateStorage() {
  newToDo.todoArray = newToDo.todoArray.filter((task, index) => {
    task.index = index + 1;
    return task;
  });
  localStorage.setItem('todoStorage', JSON.stringify(newToDo.todoArray));
}

plusIcon.addEventListener('click', () => {
  newToDo.addToDo();
  renderToDo();
  updateStorage();
});

todoInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    plusIcon.click();
  }
});

todoContainer.addEventListener('click', (event) => {
  const item = event.target;
  const itemIndex = item.id;
  const title = item.parentNode.parentNode.querySelector('.todo-text').textContent;
  if (itemIndex !== '' && itemIndex !== 'false' && itemIndex !== 'true') {
    newToDo.todoArray = newToDo.todoArray.filter((task) => task.description !== title);
    newToDo.removeToDo(item);
    updateStorage();
  }
});

todoContainer.addEventListener('click', (event) => {
  const text = event.target;
  if (text.className === 'dots-image') {
    const textParent = text.parentNode.parentNode;
    const textEdit = textParent.querySelector('.todo-text');
    const originalText = text.parentNode.parentNode.querySelector('.todo-text').innerHTML;
    const index = newToDo.todoArray.map((task) => task.description).indexOf(originalText);
    let updatedText = '';
    textEdit.contentEditable = true;
    textEdit.addEventListener('keyup', () => {
      updatedText = textEdit.innerHTML;
      if (updatedText !== originalText) {
        newToDo.todoArray[index].description = updatedText;
        newToDo.todoArray = newToDo.todoArray.filter((task) => (task.id !== index));
        updateStorage();
      }
    });
  }
});

todoContainer.addEventListener('change', (bool) => {
  const checkStatus = bool.target;
  const listItem = checkStatus.parentNode.parentNode;
  const checkbox = listItem.querySelector('.checkbox');
  const description = listItem.querySelector('.todo-text');

  newToDo.todoArray.forEach((task) => {
    if (checkbox.checked) {
      if (description.innerText === task.description) {
        task.completed = true;
        description.classList.add('strikethrough');
      }
    } else if (description.innerText === task.description) {
      task.completed = false;
      description.classList.remove('strikethrough');
      window.location.reload();
    }
  });
  updateStorage();
});

clearBtn.addEventListener('click', () => {
  newToDo.todoArray = newToDo.todoArray.filter((task) => task.completed === false);
  updateStorage();
  renderToDo();
});

renderToDo();
