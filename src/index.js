/* eslint-disable no-unused-vars */
import './style.css';
import { todoInput } from './modules/todoClass.js';
import { renderToDo, newToDo, todoContainer } from './modules/renderTodo.js';

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

todoContainer.addEventListener('click', (bool) => {
  const checkStatus = bool.target;
  const booleanValue = checkStatus.id;
  const listItem = checkStatus.parentNode.parentNode
  const checkbox = listItem.querySelector('.checkbox');
  const description = listItem.querySelector('.todo-text');
  if (booleanValue === 'false') {
    // console.log(checkbox)
    // console.log(description);
    checkbox.id = "true";
    console.log(checkbox.id);
    description.classList.add('strikethrough');
    //console.log(description.innerHTML);
  } else if (booleanValue === 'true'){
    checkbox.id = "false";
    console.log(checkbox.id);
    description.classList.remove('strikethrough');
    //console.log(description.innerHTML);
  }
  // newToDo.todoArray = newToDo.todoArray.filter((task) => (task.id === "false"));
  // updateStorage();
})

todoContainer.addEventListener('click', (event) => {
  const text = event.target;
  const textParent = text.parentNode.parentNode;
  const textEdit = textParent.querySelector('.todo-text');
  if (text.className === 'dots-image') {
    const originalText = text.parentNode.parentNode.querySelector('.todo-text').innerHTML;
    const index = newToDo.todoArray.map((task) => task.description).indexOf(originalText);
    let updatedText = '';
    textEdit.contentEditable = true;
    textEdit.addEventListener('input', () => {
      updatedText = textEdit.innerHTML;
      if (updatedText !== originalText) {
        newToDo.todoArray[index].description = updatedText;
        newToDo.todoArray = newToDo.todoArray.filter((task) => (task.id !== index));
        updateStorage();
      }
    });
  }
});



renderToDo();
