<template>
  <div id="app">
    <h1>💸Currency converter by Manos T.💸</h1>
    <form @submit.prevent="convert">
      <div class="sum">
        <p>
          Fill in the sum you wish to convert:
          <input id="conversion" type="number" v-model="confirmedValue" />
        </p>
      </div>
      <coin-selection
        :key="rerenderKey"
        title="Choose current currency"
        :coins="coins"
        currencyStatus="currency-before"
        @selected-coin="setCurrentCurrency"
      ></coin-selection>
      <coin-selection
        :key="rerenderKey"
        title="Choose currency to convert to"
        :coins="coins"
        currencyStatus="currency-after"
        @selected-coin="setFinalCurrency"
      ></coin-selection>
      <div>
        <p><button>Convert</button></p>
      </div>
    </form>
    <h3>
      <p>Outcome of conversion: {{ result }}</p>
    </h3>
  </div>
</template>

<script>
import CoinSelection from './components/CoinSelection.vue';
export default {
  components: { CoinSelection },
  data() {
    return {
      confirmedValue: null,
      coins: [],
      currentCurrency: 'init',
      finalCurrency: 'init',
      conversionTo: 0,
      conversionFrom: 0,
      result: 0,
      rerenderKey: true,
    };
  },
  methods: {
    setCurrentCurrency(coin) {
      this.currentCurrency = coin;
    },
    setFinalCurrency(coin) {
      this.finalCurrency = coin;
    },
    reachCurrency() {
      console.log('Hello');
      fetch(
        // 'https://currency-conversion-41c8a-default-rtdb.firebaseio.com/currencies.json'
        'http://localhost:1994/'
      )
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          this.coins = data;
        });
    },
    convert() {
      const coin1 = this.coins.find(
        (coin) => coin.name === this.currentCurrency
      );
      const coin2 = this.coins.find((coin) => coin.name === this.finalCurrency);
      if (!coin1 || !coin2) {
        alert('Invalid currency!');
        return;
      }
      this.conversionTo = coin1.exchangeToEUR;
      this.conversionFrom = coin2.exchangeFromEUR;

      console.log(
        this.currentCurrency,
        this.finalCurrency,
        this.conversionTo,
        this.conversionFrom
      );
      this.result = (
        this.confirmedValue *
        (this.conversionTo * this.conversionFrom)
      ).toFixed(2);
      this.result
        ? this.result
        : alert('The sum you have entered is not valid! Try again');
      setTimeout(() => {
        this.currentCurrency = this.finalCurrency = 'init';
        this.confirmedValue = null;
        this.rerenderKey = !this.rerenderKey;
      }, 2000);
    },
  },
  mounted: function () {
    this.reachCurrency();
  },
};
</script>
<style>
body {
  display: contents;
}
label {
  text-align: center;
}
h1 {
  color: navy;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: xx-large;
  background-color: bisque;
  border-top-style: solid;
  border-bottom-style: solid;
  border-top-color: navy;
  border-bottom-color: navy;
  border-top-width: thick;
  border-bottom-width: thick;
  text-align: center;
}
p {
  text-align: center;
}
label {
  text-align: center;
}
select {
  text-align: center;
}
button {
  text-align: center;
}
</style>
