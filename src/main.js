import { createApp } from 'vue'
import site from 'virtual:site'
import App from './App.vue'
import router from './router'
import './style.css'

document.documentElement.style.setProperty('--theme', site.themeColor)

createApp(App).use(router).mount('#app')
