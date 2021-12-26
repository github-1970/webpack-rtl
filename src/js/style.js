import {selectContainer} from './variables'

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
