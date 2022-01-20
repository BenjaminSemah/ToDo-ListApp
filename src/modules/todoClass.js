export const todoInput = document.querySelector('#add-todo-input');

export default class TodoObject {
  constructor() {
    this.todoArray = localStorage.getItem('todoStorage') 
    ? JSON.parse(localStorage.getItem('todoStorage')) 
    : [];
  }

  addToDo = () => {
    const todoId = this.todoArray.length;
    if (todoInput.value !== '') {
      this.todoArray.push(
        {
          description: todoInput.value,
          completed: false,
          index: todoId,
        },
      );
    }
    todoInput.value = '';
  }

  removeToDo = (icon) => {
    icon.parentNode.parentNode.remove();
  }
}