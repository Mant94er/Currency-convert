'use strict';
import { createApp } from 'vue';
import App from './App.vue';

const manos = createApp(App);

manos.mount('#app');
// (function () {
//   fetch(
//     'https://currency-conversion-41c8a-default-rtdb.firebaseio.com/currencies.json',
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify([
//         { name: 'EUR', exchangeToEUR: 1, exchangeFromEUR: 1 },
//         { name: 'USD', exchangeToEUR: 0.82, exchangeFromEUR: 1 / 0.82 },
//         { name: 'JPY', exchangeToEUR: 0.02, exchangeFromEUR: 1 / 0.02 },
//         { name: 'TRY', exchangeToEUR: 4.1, exchangeFromEUR: 1 / 4.1 },
//         { name: 'GBP', exchangeToEUR: 2.08, exchangeFromEUR: 1 / 2.08 },
//       ]),
//     }
//   );
// })();
if (module.hot) {
  module.hot.accept();
}
