'use strict';
import { createApp } from 'vue';
import App from './App.vue';

const manos = createApp(App);

manos.mount('#app');
if (module.hot) {
  module.hot.accept();
}
