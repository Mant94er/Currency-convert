import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'store',
  state: () => ({
    isLoggedIn: false,
  }),

  actions: {
    switchLogin(status) {
      if (status) {
        this.isLoggedIn = status;
      } else {
        this.isLoggedIn = !this.isLoggedIn;
      }
    },
  },
});
