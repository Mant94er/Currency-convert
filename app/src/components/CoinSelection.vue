<template>
  <div>
    <p>
      {{ title }}
      <select
        v-model="selectedCurrency"
        :name="currencyStatus"
        :id="currencyStatus"
        @click="$emit('selected-coin', selectedCurrency)"
      >
        <option value="init">-Select-</option>
        <option v-for="(coin, i) in coins" :key="i">
          {{ coin.name }}
        </option>
      </select>
    </p>
  </div>
</template>
<script>
export default {
  props: ['title', 'coins', 'currencyStatus'],
  emits: ['selected-coin'],
  data() {
    return {
      selectedCurrency: 'init',
    };
  },
};
</script>
