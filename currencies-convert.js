"use strict";
const manos = Vue.createApp({
  data() {
    return {
      value: 0,
      confirmedValue: 0,
      coins: [
        { name: "EUR", exchangeToEUR: 0, exchangeFromEUR: 0 },
        { name: "USD", exchangeToEUR: 0, exchangeFromEUR: 0 },
        { name: "JPY", exchangeToEUR: 0, exchangeFromEUR: 0 },
        { name: "TRY", exchangeToEUR: 0, exchangeFromEUR: 0 },
        { name: "GBP", exchangeToEUR: 0, exchangeFromEUR: 0 },
      ],
      currentCurrency: "EUR",
      finalCurrency: "",
      conversionTo: 0,
      conversionFrom: 0,
      result: 0,
    };
  },
  methods: {
    reachCurrency: async function () {
      const that = this;
      await fetch(
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json"
      )
        .then((data) => data.json())
        .then((response) => {
          that.coins.forEach((coin) => {
            coin.exchangeFromEUR = response.eur[coin.name.toLowerCase()];
            coin.exchangeToEUR = 1 / response.eur[coin.name.toLowerCase()];
            // console.log(coin.name, coin.exchangeToEUR, coin.exchangeFromEUR);
          });
        });
    },
    confirmInput() {
      this.confirmedValue = this.value;
      // console.log(this.confirmedValue);
    },
    setSum(e) {
      e.preventDefault();
      this.value = e.target.value;
      // console.log(e.target.value);
    },
    setCurrentCurrency(e) {
      e.preventDefault();
      const coined = this.coins[e.target.value];
      this.currentCurrency = coined.name;
      this.conversionTo = coined.exchangeToEUR;
      // console.log(coined, this.conversionTo);
    },
    setFinalCurrency(e) {
      e.preventDefault();
      const coined = this.coins[e.target.value];
      this.finalCurrency = coined.name;
      this.conversionFrom = coined.exchangeFromEUR;
      // console.log(coined, this.conversionFrom);
    },
    convert() {
      // this.reachCurrency();
      this.result = (
        this.confirmedValue *
        (this.conversionTo * this.conversionFrom)
      ).toFixed(2);
      console.log(this.conversionTo, this.conversionFrom);
      this.result
        ? this.result
        : alert("The sum you have entered is not valid! Try again");
    },
  },
  mounted: function () {
    this.reachCurrency();
  },
});
manos.mount("#app");
if (module.hot) {
  module.hot.accept();
}
