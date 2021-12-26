import {todoContent, todoInput} from '../variables'

function updateEventExec(){
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
}

export default updateEventExec
