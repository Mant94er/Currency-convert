'use strict';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import { useStore } from './store.js';
import App from './App.vue';
import ManageCurrency from './components/currencies/ManageCurrency.vue';
import HomePage from './components/pages/HomePage.vue';
import LogInPage from './components/pages/LogInPage.vue';
import SignUpPage from './components/pages/SignUpPage.vue';
import BaseButton from './components/layout/BaseButton.vue';
import BaseDialog from './components/layout/BaseDialog.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/manage', component: ManageCurrency },
    { path: '/login', component: LogInPage },
    { path: '/signup', component: SignUpPage },
    { path: '/home', component: HomePage },
  ],
});
const pinia = createPinia(useStore);
const app = createApp(App);
app.component('base-button', BaseButton);
app.component('base-dialog', BaseDialog);
app.use(router);
app.use(pinia);
app.mount('#app');

if (module.hot) {
  module.hot.accept();
}
