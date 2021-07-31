<template>
  <div id="app">
    <router-link to="/">顧客</router-link>
    <router-link :to="{
      name: 'organizationsPage',
      query: {organizations: organizations}
    }">組織</router-link>
    <search-field
    v-bind:customers="customers"
    v-bind:organizations="organizations">
    </search-field>
    <customer-table
    v-bind:customers="customers"
    v-bind:organizations="organizations">
    </customer-table>
  </div>
</template>

<script>
import SearchField from "./SearchField.vue"
import CustomerTable from "./CustomerTable.vue"
export default {
  components: {
    SearchField, CustomerTable
  },
  computed: {
    organizations: function() {
      return this.$store.getters._organizations;
    },
    customers: function() {
      return this.$store.getters._customers;
    }
  }
};
</script>