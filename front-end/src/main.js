  import { createApp } from 'vue'
  import App from './App.vue'
  import './main.css';
  import * as VueRouter from 'vue-router';
  import HauptSeite from './seiten/HauptSeite.vue';
  import NeueVeranstaltung from './seiten/NeueVeranstaltung.vue';
  import DetailAnsicht from './seiten/DetailAnsicht.vue';
  import NichtGenehmigtSeite from './seiten/NichtGenehmigtSeite.vue';
  import BearbeitenSeite from './seiten/BearbeitenSeite.vue';


  createApp(App)
  .use(VueRouter.createRouter({
      history: VueRouter.createWebHistory(process.env.BASE_URL),
      routes: [{
        path: '/hauptseite',
        component: HauptSeite,
      }, {
        path: '/neueVeranstaltung',
        component: NeueVeranstaltung,
      }, {
        path: '/detailAnsicht/:Id',
        component: DetailAnsicht,
      }, {
        path: '/nicht-genehmigt',
        component: NichtGenehmigtSeite,
      }, {
        path: '/bearbeiten/:Id',
        component: BearbeitenSeite,
      }, {
        path: '/',
        redirect: '/hauptseite', // Hier auf die gewünschte Unterseite verweisen
      },
    
    ]
  }))

  .mount('#app')
