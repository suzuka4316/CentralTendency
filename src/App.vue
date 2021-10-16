<template>
  <h1>Central Tendency App</h1>
  <section  v-if="hasCustomers">
    <ul v-for="customer in customers" :key="customer.id">
      <li>{{ customer.dob }}</li>
    </ul>
  </section>
  <p v-else>No customers are registered...</p>
</template>

<script>
export default {
  methods: {
    async loadCustomers() {
      try {
        await this.$store.dispatch("loadCustomers");
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    hasCustomers() {
      if (this.customers.length > 0) {
        return true;
      }
      return false;
    },
    customers() {
      return this.$store.getters["customers"];
    },
  },
  created() {
    this.loadCustomers();
  },
};
</script>

<style>
html {
  font-family: sans-serif;
}
body {
  margin: 0;
}
</style>
