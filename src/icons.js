import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faWindowMinimize, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faSquare, faClone } from '@fortawesome/free-regular-svg-icons'

library.add(faBars, faWindowMinimize, faSquare, faClone, faTimes)
Vue.component('fa-icon', FontAwesomeIcon)