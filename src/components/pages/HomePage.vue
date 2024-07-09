<template>
  <div>
    <div>
      <base-form @submit.prevent="convert">
        <div class="sum">
          <p @blur="resetErrors">
            Fill in the sum you wish to convert:
            <input id="conversion" type="number" v-model="confirmedValue" />
          </p>
          <p v-if="!terminalValue" class="errors">
            Please provide a positive rational number as a sum!
          </p>
        </div>
        <coin-selection
          @blur="resetErrors"
          :key="rerenderKey"
          title="Choose current currency"
          :coins="coins"
          currencyStatus="currency-before"
          @selected-coin="setCurrentCurrency"
        ></coin-selection>
        <coin-selection
          @blur="resetErrors"
          :key="rerenderKey"
          title="Choose currency to convert to"
          :coins="coins"
          currencyStatus="currency-after"
          @selected-coin="setFinalCurrency"
        ></coin-selection>
        <p v-if="!currenciesAreValid" class="errors">Invalid currency!</p>
        <div>
          <p>
            <base-button>Convert</base-button>
          </p>
        </div>
      </base-form>
      <h3>
        <p>Outcome of conversion: {{ result }}</p>
      </h3>
    </div>
  </div>
</template>
<script>
import CoinSelection from '../currencies/CoinSelection.vue';
export default {
  emits: ['login-success'],
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
      terminalValue: true,
      currenciesAreValid: true,
    };
  },
  methods: {
    resetErrors() {
      if (this.confirmedValue) {
        this.terminalValue = true;
      }
      if (this.currentCurrency !== 'init' && this.finalCurrency !== 'init') {
        this.currenciesAreValid = true;
      }
    },
    setCurrentCurrency(coin) {
      this.currentCurrency = coin;
    },
    setFinalCurrency(coin) {
      this.finalCurrency = coin;
    },
    reachCurrency() {
      fetch('/currencies')
        .then((resp) => resp.json())
        .then((data) => {
          this.coins = data;
        });
    },
    convert() {
      const coin1 = this.coins.find(
        (coin) => coin.name === this.currentCurrency
      );
      const coin2 = this.coins.find((coin) => coin.name === this.finalCurrency);
      if (!this.confirmedValue) {
        this.terminalValue = false;
      } else {
        this.terminalValue = true;
      }
      if (!coin1 || !coin2) {
        this.currenciesAreValid = false;
        return;
      } else {
        this.currenciesAreValid = true;
      }
      this.conversionTo = coin1.exchangeToEUR;
      this.conversionFrom = coin2.exchangeFromEUR;
      this.result = `${this.confirmedValue} ${
        this.currentCurrency !== 'init' ? this.currentCurrency + ' =' : ''
      } ${
        this.confirmedValue *
        (this.conversionTo * this.conversionFrom).toFixed(2)
          ? this.confirmedValue *
            (this.conversionTo * this.conversionFrom).toFixed(2)
          : ''
      } ${this.finalCurrency !== 'init' ? this.finalCurrency : ''}`;

      this.result
        ? this.result
        : alert('The sum you have entered is not valid! Try again');
      setTimeout(() => {
        this.currentCurrency = this.finalCurrency = 'init';
        this.confirmedValue = null;
        this.terminalValue = true;
        this.rerenderKey = !this.rerenderKey;
      }, 3000);
    },
  },
  mounted: function () {
    this.reachCurrency();
  },
};
</script>
<style scoped>
h3 {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  border-radius: 10px;

  text-align: center;
  width: 45%;
  max-width: 40rem;
  color: navy;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: large;
  background-color: bisque;
  border-top-style: solid;
  border-bottom-style: solid;
  border-top-color: navy;
  border-bottom-color: navy;
  border-top-width: thick;
  border-bottom-width: thick;
}
div {
  margin: 8px;
}
.errors {
  color: red;
}
</style>
