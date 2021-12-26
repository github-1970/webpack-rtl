import {todoContent} from '../variables'
import {getValuesFromLocalStorage} from '../localStorageHandler'

function deleteEventExec(){
  todoContent.addEventListener("click", function (e) {
    // let _todoItem = e.target.parentNode.parentNode.parentNode;
    let _todoItem = e.target.closest('.todo-item');
    let parent = e.target.closest('.trash');
  
    // if (parent.classList.contains("trash")) {
    if (parent) {
      let textItem = _todoItem.querySelector(".li-text")
  
      let localValuesEdited = getValuesFromLocalStorage().filter(item => item.text != textItem.innerHTML)
      localStorage.setItem('todo', JSON.stringify(localValuesEdited))
  
      _todoItem.remove();
    }
  });
}

export default deleteEventExec
