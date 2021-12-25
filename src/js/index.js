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
// change caret direction
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
// end change caret
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

      let localValuesEdited = getValuesFromLocalStorage().map(text => text == textItem.innerText ? todoInput.value : text)
      localStorage.setItem( 'todo', JSON.stringify(localValuesEdited) )

      textItem.innerText = todoInput.value;
      editing.classList.remove("editing");
      editing.scrollIntoView({ behavior: "smooth", block: "center" });
      todoInput.value = "";
    }
    // add item
    else {
      let inputArray = getValuesFromLocalStorage()
      inputArray.push(todoInput.value)
      localStorage.setItem( 'todo', JSON.stringify(inputArray) )

      addElement(todoInput.value);
      todoInput.value = "";
      todoInput.focus();
    }
  }
});

function addElement(value) {
  let li = document.createElement("li");
  li.classList.add("todo-item");
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
  let _todoItem = e.target.parentNode.parentNode.parentNode;
  let parent = e.target.parentNode;

  if (parent.classList.contains("check")) {
    _todoItem.classList.toggle("completed");
  }
});
// todoItems.forEach(item => {
//   item.addEventListener('click', function(e){
//     let _todoItem = e.target.parentNode.parentNode.parentNode

//     if( _todoItem.classList.contains('todo-item') ){
//       _todoItem.classList.toggle('completed')
//     }
//   })
// })
// end completed and uncompleted

// remove item
todoContent.addEventListener("click", function (e) {
  let _todoItem = e.target.parentNode.parentNode.parentNode;
  let parent = e.target.parentNode;

  if (parent.classList.contains("trash")) {
    let textItem = _todoItem.querySelector(".li-text")

    let localValuesEdited = getValuesFromLocalStorage().filter(text => text != textItem.innerText)
    localStorage.setItem( 'todo', JSON.stringify(localValuesEdited) )

    _todoItem.remove();
  }
});
// end remove item

// edit
todoContent.addEventListener("click", function (e) {
  let _todoItem = e.target.parentNode.parentNode.parentNode;
  let parent = e.target.parentNode;
  let text = _todoItem.innerText;

  if (parent.classList.contains("edit")) {
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
todoClear.addEventListener('click', function(){
  todoContent.innerHTML = ''
  localStorage.setItem('todo', [])
})
// end clear todo

// local storage
// load elements in localstorage
window.addEventListener('load', function(){
  // just abuse...
  todoInput.focus()
  // end just abuse...

  let localValues = getValuesFromLocalStorage()
  if(localValues.length >= 1){
    localValues.forEach( localValue => addElement(localValue) )
  }
})
// load elements in localstorage

// get values from localstorage
function getValuesFromLocalStorage(){
  return localStorage.getItem('todo') && IsJsonString( localStorage.getItem('todo') ) && JSON.parse( localStorage.getItem('todo') ) ? JSON.parse( localStorage.getItem('todo') ) : [];
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
// end public methods

// The End!
