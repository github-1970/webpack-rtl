import {textWithClassForItems, IsJsonString} from './helper';
import {todoInput} from './variables';
import {addElement} from './crud/create';

// load elements in localstorage
function localStorageEventExec(){
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
}
// load elements in localstorage

// get values from localstorage
function getValuesFromLocalStorage() {
  return localStorage.getItem('todo') && IsJsonString(localStorage.getItem('todo')) && JSON.parse(localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];
}
// end get values from localstorage

export {
  localStorageEventExec,
  getValuesFromLocalStorage
}
