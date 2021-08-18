<template>
  <div id="customerTable">
    <router-link to="/customers/create">顧客の追加</router-link>
    <table rules="rows">
      <tr>
        <th>ID</th><th>氏名</th><th>性別</th><th>生年月日</th><th>所属会社</th>
      </tr>
      <customer
      v-for="customer in searchedCustomers"
      v-bind:customer="customer"
      v-bind:key="customer.id"
      v-bind:organizations="organizations">
      </customer>
    </table>
  </div>
</template>

<script>
import Customer from './Customer.vue';
export default {
  components: {
    Customer
  },
  computed: {
    organizations: function() {
      return this.$store.getters._organizations;
    },
    searchedCustomers: function() {
      return this.$store.getters._searchedCustomers;
    }
  }
};
</script>