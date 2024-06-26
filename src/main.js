'use strict';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import { useStore } from './store.js';
import App from './App.vue';
import AddCurrency from './components/AddCurrency.vue';
import HomePage from './components/HomePage.vue';
import LogInPage from './components/LogInPage.vue';
import SignUpPage from './components/SignUpPage.vue';
import OpenPage from './components/OpenPage.vue';
import BaseButton from './components/BaseButton.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: OpenPage },
    { path: '/manage', component: AddCurrency },
    { path: '/login', component: LogInPage },
    { path: '/signup', component: SignUpPage },
    { path: '/home', component: HomePage },
  ],
});
const pinia = createPinia(useStore);

const manos = createApp(App);
manos.component('base-button', BaseButton);
manos.use(router);
manos.use(pinia);
manos.mount('#app');

if (module.hot) {
  module.hot.accept();
}
