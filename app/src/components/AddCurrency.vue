<template>
  <form @submit.prevent="addCoin" id="add" name="add">
    <h2>Add Currency</h2>
    <div>
      <p>Name of currency: <input type="text" v-model="newCurrency" /></p>
    </div>
    <div>
      <p>
        Conversion value: <input type="number" v-model="newValue" step="any" />
      </p>
    </div>
    <p><button>Add</button></p>
  </form>
</template>
<script>
export default {
  data() {
    return {
      newCurrency: '',
      newValue: '',
    };
  },
  methods: {
    addCoin() {
      if (this.newCurrency.trim() === '' || this.newValue == '') {
        alert(
          'Invalid input! Please provide correct characters or numbers respectively.'
        );
        return;
      }
      this.$emit('add-coin', this.newCurrency, this.newValue);
    },
  },
};
</script>
<style scoped>
h2 {
  text-align: center;
}
</style>
