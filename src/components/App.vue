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
  data: function() {
    return {
      organizationArray: [],
      customerArray: []
    }
  },
  components: {
    SearchField, CustomerTable
  },
  created: function() {
    this.setOrganizations().then(() => {
      this.setCustomers();
    });
  },
  methods: {
    setOrganizations: async function() {
      const response = await fetch('./resources/organizations.json');
      const data = await response.json();

      this.organizationArray = data;
    },
    setCustomers: async function() {
      const response = await fetch('./resources/customers.json');
      const data = await response.json();

      this.customerArray = data;
  }
  },
  computed: {
    organizations: function() {
      return this.organizationArray;
    },
    customers: function() {
      return this.customerArray;
    }
  }
};
</script>