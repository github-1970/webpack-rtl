import {select} from './variables'

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
