import { createApp } from 'vue'
import '@/scss/app.scss'
import App from './App.vue'
import VueClickAway from "vue3-click-away";

createApp(App).use(VueClickAway).mount('#app')
