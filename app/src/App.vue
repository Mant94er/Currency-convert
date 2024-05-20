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
      <div>
        <p>
          Choose current currency:
          <select
            v-model="currentCurrency"
            name="currency-before"
            id="currency-before"
          >
            <option value="init">-Select-</option>
            <option v-for="(coin, i) in coins" :key="i">
              {{ coins[i].name }}
            </option>
          </select>
        </p>
      </div>
      <div>
        <p>
          Choose currency to convert to:
          <select v-model="finalCurrency" name="currency" id="currency-after">
            <option value="init">-Select-</option>
            <option v-for="(coin, i) in coins" :key="i">
              {{ coins[i].name }}
            </option>
          </select>
        </p>
      </div>
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
export default {
  data() {
    return {
      confirmedValue: null,
      coins: [],
      currentCurrency: 'init',
      finalCurrency: 'init',
      conversionTo: 0,
      conversionFrom: 0,
      result: 0,
    };
  },
  methods: {
    reachCurrency() {
      console.log('Hello');
      fetch(
        // 'https://currency-conversion-41c8a-default-rtdb.firebaseio.com/currencies.json'
        '/currencies'
      )
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          this.coins = data;
        });
      //   for (const id in data) {
      //     for (const coin in data[id]) {
      //       this.coins.push({
      //         name: data[id][coin].name,
      //         exchangeToEUR: data[id][coin].exchangeToEUR,
      //         exchangeFromEUR: data[id][coin].exchangeFromEUR,
      //       });
      //     }
      //   }
      // });
    },
    convert() {
      const coin1 = this.coins.find(
        (coin) => coin.name === this.currentCurrency
      );
      this.conversionTo = coin1.exchangeToEUR;
      const coin2 = this.coins.find((coin) => coin.name === this.finalCurrency);
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
