import {todoContent, todoSubmit, todoInput} from '../variables'
import {getValuesFromLocalStorage} from '../localStorageHandler'

function createEventExec(){
  todoSubmit.addEventListener("click", function (e) {
    e.preventDefault();
  
    let error = document.querySelector(".error");
    error?.remove();
  
    // check error
    if (todoInput.value == "") {
      addError();
      todoInput.focus();
    }
    else {
      const editing = document.querySelector(".editing");
      // edit item
      if (editing) {
        let textItem = editing.querySelector(".li-text")
        let itemsEdited = getValuesFromLocalStorage().map(item => {
          if(item.text === textItem.innerHTML){
            item.text = todoInput.value
          }
          return item
        })
        localStorage.setItem('todo', JSON.stringify(itemsEdited))
  
        textItem.innerText = todoInput.value;
        editing.classList.remove("editing");
        editing.scrollIntoView({ behavior: "smooth", block: "center" });
        todoInput.value = "";
      }
      // add item
      else {
        let inputsArray = getValuesFromLocalStorage()
        let itemObj = {text: todoInput.value, classList: []}
        inputsArray.push(itemObj)
        localStorage.setItem('todo', JSON.stringify(inputsArray))
  
        addElement(todoInput.value);
        todoInput.value = "";
        todoInput.focus();
      }
    }
  });
}

function addElement(value, classList=[]) {
  let li = document.createElement("li");
  li.classList.add("todo-item");
  classList.length >= 1 && li.classList.add(...classList);
  li.innerHTML = `
  <span class="li-text">${value}</span>
  
  <span class="icons">
    <span class="check">
      <i class="far fa-square fa-lg"></i>
      <i class="far fa-check-square fa-lg"></i>
    </span>

    <span class="edit">
      <i class="far fa-edit fa-lg"></i>
    </span>
    
    <span class="trash">
      <i class="far fa-trash-alt fa-lg"></i>
    </span>
  </span>
  `;
  todoContent.prepend(li);
}

function addError() {
  let li = document.createElement("li");
  li.classList.add("error");
  li.innerText = "Error : input can not be empty!";
  todoContent.prepend(li);
}

export {
  createEventExec,
  addElement,
  addError
}
