import Vuex from "vuex";

export const store = new Vuex.Store({
  state() {
    return {
      customers: [],
    };
  },
  
  getters: {
    customers(state) {
      return state.customers;
    },
  },

  actions: {
    async loadCustomers(context) {
      const response = await fetch(
        "https://central-tendency-default-rtdb.firebaseio.com/customers.json"
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to fetch customers data"
        );
        throw error;
      }

      const customers = []
      for (const key in responseData) {
        const customer = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          dob: responseData[key].dob,
        }
        customers.push(customer)
      }

      context.commit('setCustomers', customers)
    },
  },

  mutations: {
    setCustomers(state, payload) {
      state.customers = payload
    }
  }
});
