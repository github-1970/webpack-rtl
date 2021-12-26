import "../scss/styles.scss";
import "@fortawesome/fontawesome-free/js/all.min";

// change style with js
import './style.js'

// completed and uncompleted
import './checkDoneTasks'

// filter items
import './filterTasks'

// local storage
import {localStorageEventExec} from './localStorageHandler'
localStorageEventExec()

// global events
import './globalEvents'

// crud
import './crud'
