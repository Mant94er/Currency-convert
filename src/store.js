import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'store',
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    switchLogin() {
      this.isLoggedIn = !this.isLoggedIn;
    },
  },
});
