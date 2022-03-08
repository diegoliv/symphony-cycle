import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './assets/tailwind.css'
import './assets/main.css'
import vClickOutside from 'click-outside-vue3'

createApp(App).use(store).use(router).use(vClickOutside).mount('#app')
