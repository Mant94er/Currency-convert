<template>
  <div id="app">
    <h1>💸Currency converter by Manos T.💸</h1>
    <p id="form">
      Fill in the sum you wish to convert:
      <input id="conversion" type="text" @change="setSum" />
      <!-- <button @click="confirmInput">Enter</button> -->
    </p>
    <p>
      Choose current currency:
      <select
        name="currency-before"
        id="currency-before"
        @change="setCurrentCurrency"
      >
        <option value="">-Select-</option>
        <option v-for="(coin, i) in coins" :key="i">{{ coin.name }}</option>
      </select>
    </p>
    <p>
      Choose currency to convert to:
      <select @change="setFinalCurrency" name="currency" id="currency-after">
        <option value="">-Select-</option>
        <option v-for="(coin, i) in coins" :key="i">{{ coin.name }}</option>
      </select>
    </p>
    <p><button @click="convert">Convert</button></p>
    <h3>
      <p>Outcome of conversion: {{ result }}</p>
    </h3>
  </div>
</template>
<script>
export default {
  data() {
    return {
      confirmedValue: 0,
      coins: [
        { name: 'EUR', exchangeToEUR: 0, exchangeFromEUR: 0 },
        { name: 'USD', exchangeToEUR: 0, exchangeFromEUR: 0 },
        { name: 'JPY', exchangeToEUR: 0, exchangeFromEUR: 0 },
        { name: 'TRY', exchangeToEUR: 0, exchangeFromEUR: 0 },
        { name: 'GBP', exchangeToEUR: 0, exchangeFromEUR: 0 },
      ],
      currentCurrency: 'EUR',
      finalCurrency: '',
      conversionTo: 0,
      conversionFrom: 0,
      result: 0,
    };
  },
  methods: {
    reachCurrency: async function () {
      const that = this;
      await fetch(
        'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json'
      )
        .then((data) => data.json())
        .then((response) => {
          that.coins.forEach((coin) => {
            coin.exchangeFromEUR = response.eur[coin.name.toLowerCase()];
            coin.exchangeToEUR = 1 / response.eur[coin.name.toLowerCase()];
          });
        });
    },
    setSum(e) {
      e.preventDefault();
      this.confirmedValue = e.target.value;
    },
    setCurrentCurrency(e) {
      e.preventDefault();
      const coined = this.coins.find((coin) => coin.name === e.target.value);
      this.currentCurrency = coined.name;
      this.conversionTo = coined.exchangeToEUR;
    },
    setFinalCurrency(e) {
      e.preventDefault();
      const coined = this.coins.find((coin) => coin.name === e.target.value);
      this.finalCurrency = coined.name;
      this.conversionFrom = coined.exchangeFromEUR;
    },
    convert() {
      this.result = (
        this.confirmedValue *
        (this.conversionTo * this.conversionFrom)
      ).toFixed(2);
      console.log(this.conversionTo, this.conversionFrom);
      this.result
        ? this.result
        : alert('The sum you have entered is not valid! Try again');
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
