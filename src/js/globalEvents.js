import {todoContent, todoClear, todoInput} from './variables'

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
