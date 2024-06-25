<template>
  <div>
    <form @submit.prevent="addNewCurrency" id="add" name="add">
      <h2>Add Currency</h2>
      <div>
        <p>Name of currency: <input type="text" v-model="newCurrency" /></p>
      </div>
      <div>
        <p>
          Conversion value:
          <input type="number" v-model="newValue" step="any" />
        </p>
      </div>
      <p>
        <base-button>Add</base-button>
      </p>
    </form>
    <form @submit.prevent="removeCurrency" id="remove" name="remove">
      <h2>Delete currency</h2>
      <select v-model="currencyToRemove">
        <option value="init">-Select-</option>
        <option v-for="coin in coins" :key="coin">
          {{ coin }}
        </option>
      </select>
      <base-button>Remove</base-button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newCurrency: '',
      newValue: '',
      coins: [],
      currencyToRemove: 'init',
    };
  },
  methods: {
    addNewCurrency() {
      fetch('/currencies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: this.newCurrency.trim().toUpperCase(),
          exchangeToEUR: this.newValue,
          exchangeFromEUR: 1 / this.newValue,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    },
    reachCurrency() {
      fetch('/currencies')
        .then((resp) => resp.json())
        .then((data) => {
          const coins = data.map((coin) => coin.name);
          this.coins = coins;
        });
    },
    removeCurrency() {
      fetch('/removals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: this.currencyToRemove,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    },
  },
  mounted() {
    this.reachCurrency();
  },
};
</script>
<style scoped>
h2 {
  text-align: center;
}
form {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  width: 90%;
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
</style>
