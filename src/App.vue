<template>
  <the-header>
    <h1>Central Tendency App</h1>
  </the-header>

  <base-card>
    <section v-if="hasCustomers">
      <h1>Date of Birth of Customers</h1>
      <ul v-for="customer in customers" :key="customer.id">
        <li>{{ customer.dob }}</li>
      </ul>
    </section>
    <h3 v-else>No customers are registered...</h3>
  </base-card>

  <base-card>
    <base-button @click="calcCentralTendency()"
      >Calculate Central Tendency</base-button
    >
    <h2>AVERAGE: {{ average }}</h2>
    <h2>MODE: {{ mode }}</h2>
    <h2>MEDIAN: {{ median }}</h2>
  </base-card>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
  data() {
    return {
      average: null,
      median: null,
      mode: null,
    };
  },

  methods: {
    async loadCustomers() {
      try {
        await this.$store.dispatch("loadCustomers");
      } catch (error) {
        console.log(error);
      }
    },

    getAge(customerDob) {
      const dashTakenDob = customerDob.replace(/-/g, "");
      const day = dashTakenDob.substr(0, 2);
      const month = dashTakenDob.substr(2, 2);
      const year = dashTakenDob.substr(4, 4);

      const dob = new Date(year, month, day);
      // age difference in milliseconds
      const ageDiffMS = Date.now() - dob.getTime();
      // convert milliseconds into date
      const ageDiffDate = new Date(ageDiffMS);
      // subtract 1970 (Unix time)
      return ageDiffDate.getUTCFullYear() - 1970;
    },

    searchMode(array) {
      let counts = {};
      let compare = 0;
      let mostFrequent;
      for (let i = 0, len = array.length; i < len; i++) {
        let age = array[i]; //27

        // if age doesn't exist in counts object
        if (counts[age] === undefined) {
          counts[age] = 1; // counts : { 27 : 1 }
        } else {
          // if exists
          counts[age] = counts[age] + 1; // counts: { 27 : 2 }
        }

        // if the age was counted more than once, store frequency in compare and the age in mostFrequent
        if (counts[age] > compare && counts[age] > 1) {
          compare = counts[age];
          mostFrequent = array[i];
        }
      }
      return mostFrequent ? mostFrequent : "No Mode Found";
    },

    searchMedian(array) {
      // [27, 30, 39, 39, 40, 48, 59]
      const sortedAges = array.sort(); // JS sort uses quicksort. Consider using different algorithms for larger data
      let middleIndex = Math.floor(sortedAges.length / 2);

      // if length of array is even, calculate the average between 2 numbers
      if (sortedAges.length % 2 === 0) {
        const average =
          (sortedAges[middleIndex - 1] + sortedAges[middleIndex]) / 2;
        return average.toFixed(2);
      }
      return sortedAges[middleIndex];
    },

    calcCentralTendency() {
      const customers = this.customers;
      let ages = [];
      for (const key in customers) {
        const age = this.getAge(customers[key].dob);
        ages.push(age);
      }

      if (ages.length == 0) {
        return;
      }

      const sum = ages.reduce((prev, curr) => prev + curr, 0); // initial value = 0
      this.average = (sum / ages.length).toFixed(2);
      this.mode = this.searchMode(ages);
      this.median = this.searchMedian(ages);
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
