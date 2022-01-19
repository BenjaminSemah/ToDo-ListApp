import _ from 'lodash';
import './style.css';
import dotsIcon from './imgDots.svg';

const todoItems = [
  {
    description: 'Go for a run',
    completed: false,
    index: 0,
  },
  {
    description: 'Read 5 pages',
    completed: false,
    index: 1,
  },
  {
    description: 'Complete todo list project',
    completed: false,
    index: 3,
  },
  {
    description: 'Spend 15 minutes on LinkedIn',
    completed: false,
    index: 4,
  },
];

let todoHTML = '';

todoItems.forEach((item) => {
  todoHTML
    += `
      <li class="list-item">
      <div class="checkAndText">
        <input id="${item.completed}" class="checkbox" type="checkbox" />
        <p class="todo-text" id="${item.index}">${item.description}</p>
      </div>
      <img id="dots-image" src="${dotsIcon}" alt="three dots image" />
      </li>
   `;
});

const todoContainer = document.querySelector('.todo-list');

todoContainer.innerHTML = todoHTML;

////////////////////////////////////////////////
// function component() {
//   const element = document.createElement('div');

//   // Lodash, now imported by this script
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//   element.classList.add('hello');
  
//   return element;
// }

// document.body.appendChild(component());
// index.html