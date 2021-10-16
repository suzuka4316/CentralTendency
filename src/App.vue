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
    <h2>MODE(S): {{ mode }}</h2>
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

    searchModes(array) {
      // [27, 30, 39, 39, 40, 40, 48, 59]
      let counts = {};
      let mostFrequent = 0;
      let modes = [];

      for (let i in array) {
        counts[array[i]] = (counts[array[i]] || 0) + 1; // counts: { 27 : 1 }

        if (counts[array[i]] > mostFrequent) {
          mostFrequent = counts[array[i]];
        }
      }

      for (let j in counts) {
        // same frequency?
        if (counts[j] == mostFrequent) {
          modes.push(j);
        }
      }
      
      // no modes if all elements in array have the same frequency
      return modes.length == array.length ? "No modes found" : modes;
    },

    searchMedian(array) {
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
      this.mode = this.searchModes(ages);
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
