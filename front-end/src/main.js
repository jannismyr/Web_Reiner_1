import { createApp } from 'vue'
import App from './App.vue'
import './main.css';
import * as VueRouter from 'vue-router';
import VeranstaltungsSeite from './seiten/VeranstaltungsSeite.vue';

createApp(App)
.use(VueRouter.createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes: [{
      path: '/veranstaltungen',
      component: VeranstaltungsSeite,
    }]
}))

.mount('#app')
