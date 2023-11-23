  import { createApp } from 'vue'
  import App from './App.vue'
  import './main.css';
  import * as VueRouter from 'vue-router';
  import VeranstaltungsSeite from './seiten/VeranstaltungsSeite.vue';
  import NeueVeranstaltung from './seiten/NeueVeranstaltung.vue';

  createApp(App)
  .use(VueRouter.createRouter({
      history: VueRouter.createWebHistory(process.env.BASE_URL),
      routes: [{
        path: '/veranstaltungen',
        component: VeranstaltungsSeite,
      }, {
        path: '/neueVeranstaltung',
        component: NeueVeranstaltung,
      },  {
        path: '/',
        redirect: '/veranstaltungen', // Hier auf die gewünschte Unterseite verweisen
      },
    
    ]
  }))

  .mount('#app')
