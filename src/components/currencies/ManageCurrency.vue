<template>
  <base-dialog
    v-if="event"
    :title="title"
    :currency="sentCurrency"
    :value="sentValue"
    :event="event"
    @close="closeDialog"
  ></base-dialog>
  <div>
    <form id="manage">
      <h2>Manage Currencies</h2>
      <ul>
        <li v-for="coin in coins" :key="coin.name">
          <div class="currencies">
            {{ coin.name }}
          </div>
          <div class="currencies">
            {{ coin.exchangeToEUR }}
          </div>
          <div :class="coin.name">
            <button
              @click.prevent="openEditDialog"
              class="edit"
              title="Edit"
            ></button>
            <button
              @click.prevent="openDeleteDialog"
              class="bin"
              title="Delete"
            ></button>
          </div>
        </li>
      </ul>
      <base-button @click.prevent="openAddDialog">Add</base-button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newCurrency: null,
      newValue: null,
      coins: [],
      currencyToRemove: 'init',
      isValid: true,
      event: null,
      sentCurrency: null,
      sentValue: null,
      sentTitle: '',
    };
  },
  methods: {
    selectCurrency(e) {
      const currency = e.target.parentElement.classList.value;
      this.sentCurrency = currency;
      const coin = this.coins.find((coin) => coin.name === currency);
      const value = coin.exchangeToEUR;
      this.sentValue = value;
    },
    closeDialog(coins) {
      this.event = null;
      if (coins) this.coins = coins;
    },
    openEditDialog(e) {
      this.selectCurrency(e);
      this.title = 'Update your selected currency';
      this.event = 'edit';
    },
    openDeleteDialog(e) {
      this.selectCurrency(e);
      this.title = 'Are you sure you want to delete your selected currency?';
      this.event = 'delete';
    },
    openAddDialog() {
      this.sentCurrency = null;
      this.sentValue = null;
      this.title = 'Add a new currency';
      this.event = 'add';
    },
    reachCurrency() {
      fetch('/currencies')
        .then((resp) => resp.json())
        .then((data) => {
          this.coins = data;
        });
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
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  border-radius: 10px;
  text-align: center;
  width: 40%;
  max-width: 40rem;
  color: navy;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: large;
  background-color: #ffe4c4;
  border-top-style: solid;
  border-bottom-style: solid;
  border-top-color: navy;
  border-bottom-color: navy;
  border-top-width: thick;
  border-bottom-width: thick;
}
.currencies {
  background-color: white;
  border-color: #000080;
  height: 20px;
  width: 40px;
}
li {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 40px;
}
li div {
  margin: 1rem 5%;
}
li div button {
  cursor: pointer;
  background-color: navy;
  border-color: navy;
  color: #000080;
}
li div button[title]:hover:before {
  position: absolute;
}
.edit {
  background: url('../../images/edit-icon.jpg');
  height: 27px;
  width: 27px;
  margin: 1rem;
  background-size: cover;
}
.bin {
  background: url('../../images/bin-icon.jpg');
  height: 27px;
  width: 27px;
  margin: 1rem;
  background-size: cover;
}
ul {
  align-items: center;
}
</style>
