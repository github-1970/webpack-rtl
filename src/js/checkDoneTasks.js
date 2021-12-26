import {todoContent} from './variables'
import {getValuesFromLocalStorage} from './localStorageHandler'

// completed and uncompleted
todoContent.addEventListener("click", function (e) {
  let _todoItem = e.target.closest('.todo-item');
  let parent = e.target.closest('.check');

  if (parent) {
    _todoItem.classList.toggle("completed");

    // add itemClass in localstorage
    let textItem = _todoItem.querySelector(".li-text")
    let classList = _todoItem.className.split(' ').filter(item => item != 'todo-item')

    let itemsEdited = getValuesFromLocalStorage().map(item => {
      if(item.text === textItem.innerHTML){
        item.classList = classList
      }
      return item
    })

    localStorage.setItem('todo', JSON.stringify(itemsEdited))
    // end add itemClass in localstorage
  }
});
// end completed and uncompleted
