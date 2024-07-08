<template>
  <div @click="$emit('close')"></div>
  <dialog open>
    <form @submit.prevent="update">
      <h2>{{ title }}</h2>
      <section v-if="showInput">
        <p>
          Currency name:
          <input type="text" :placeholder="currency" v-model="newCurrency" />
        </p>
        <p>
          Conversion value:
          <input
            type="number"
            :placeholder="value"
            v-model="newValue"
            step="0.01"
          />
        </p>
        <p v-if="!isValid">⛔ Please provide a valid currency and/or value!</p>
      </section>
      <base-button>OK</base-button>
    </form>
  </dialog>
</template>
<script>
export default {
  emits: ['close'],
  props: {
    title: {
      type: String,
      required: true,
    },
    currency: {
      type: String || null,
      required: false,
    },
    value: {
      type: Number || null,
      required: false,
    },
    event: {
      type: String,
      required: true,
    },
  },
  computed: {
    showInput() {
      return this.event === 'edit' || this.event === 'add';
    },
  },
  data() {
    return {
      newCurrency: '',
      newValue: '',
      isValid: true,
      coins: [],
    };
  },
  methods: {
    closeDialog() {
      this.$emit('close', this.coins);
    },
    update() {
      if (this.event !== 'delete' && (!this.newCurrency || !this.newValue)) {
        this.isValid = false;
        return;
      } else if (this.showInput) {
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
          .then((data) => {
            this.coins = data;
            this.closeDialog();
          })
          .catch((err) => {
            if (err) this.isValid = false;
          });
      } else if (this.event === 'delete') {
        fetch('/removals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: this.currency,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            this.coins = data;
            this.closeDialog();
          });
      }
    },
  },
};
</script>
<style scoped>
div {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}
dialog {
  position: sticky;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border: none;
  padding: 0;
  overflow: hidden;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  border-radius: 10px;
  text-align: center;
  /* width: 50%; */
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
section {
  padding: 1rem;
}
form button {
  cursor: pointer;
}
</style>
