import "../scss/styles.scss";
import "@fortawesome/fontawesome-free/js/all.min";

// variables
const selectContainer = document.querySelector(".select-container");
const todoContent = document.querySelector(".todo-content");
// const todoItems = document.querySelectorAll('.todo-item')
const todoInput = document.querySelector(".todo-input");
const todoSubmit = document.querySelector(".todo-submit");
const todoClear = document.querySelector(".todo-clear");
const select = document.querySelector("select");
// end variables

// style
// caret direction change
window.addEventListener("click", function (e) {
  if (
    e.target.parentNode == selectContainer &&
    selectContainer.dataset.after != ""
  ) {
    selectContainer.dataset.after = "";
  } else {
    selectContainer.dataset.after = "";
  }
});
// end caret direction change
// end style

// add item
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
// end add item

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

// remove item
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
// end remove item

// edit
todoContent.addEventListener("click", function (e) {
  let _todoItem = e.target.closest('.todo-item');
  let parent = e.target.closest('.edit');
  let text = _todoItem.innerText;

  if (parent) {
    todoInput.value = "";
    if (!_todoItem.classList.contains("editing")) {
      todoInput.value = text;
      todoInput.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(function () {
        todoInput.focus();
      }, 500);
    }

    const editing = document.querySelectorAll(".editing");
    editing.forEach(function (item) {
      if (item != _todoItem) {
        item.classList.remove("editing");
      }
    });

    _todoItem.classList.toggle("editing");
  }
});
// end edit

// filter
select.addEventListener("change", filterHandler);
select.addEventListener("dblclick", filterHandler);

function filterHandler() {
  let error = document.querySelector(".error");
  error?.remove();

  let todoItems = document.querySelectorAll(".todo-item");

  if (todoItems.length >= 1) {
    if (this.value == "all") {
      [...todoItems].forEach((item) => {
        item.style.display = "flex";
      });
    }
    else if (this.value == "completed") {
      Array.from(todoItems).forEach((item) => {
        item.classList.contains("completed")
          ? item.style.display = "flex"
          : item.style.display = "none";
      });
    }
    else {
      Array.from(todoItems).forEach((item) => {
        item.classList.contains("completed")
          ? item.style.display = "none"
          : item.style.display = "flex";
      });
    }
  }
}
// end filter

// clear todo
todoClear.addEventListener('click', function () {
  todoContent.innerHTML = ''
  localStorage.setItem('todo', [])
})
// end clear todo

// sanitize todoInput
todoInput.addEventListener('change', function(){
  todoInput.value = todoInput.value.replace(/<.*?>/gm, '')
})
// end sanitize todoInput

// local storage
// load elements in localstorage
window.addEventListener('load', function () {
  // just abuse...
  todoInput.focus()
  // end just abuse...

  try{
    let localItems = textWithClassForItems( getValuesFromLocalStorage() )
    if (localItems.length >= 1) {
      localItems.forEach(localItem => addElement(localItem.text, localItem.classList))
    }
  }
  catch(err){
    console.log(err)
  }
  
})
// load elements in localstorage

// get values from localstorage
function getValuesFromLocalStorage() {
  return localStorage.getItem('todo') && IsJsonString(localStorage.getItem('todo')) && JSON.parse(localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];
}
// end get values from localstorage
// end local storage

// public methods
function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function textWithClassForItems(LSObject,) {
  return LSObject.map(item => {
    let text = item.text
    // let classValue = item.classList.length>1 ? item.classList.reduce((acc, item) => acc += ' ' + item, ''): item.classList[0]
    return {text, classList: item.classList}
  })
}
// end public methods
