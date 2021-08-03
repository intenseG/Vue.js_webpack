<template>
  <div id="customerTable">
    <table rules="rows">
      <tr>
        <th>ID</th><th>氏名</th><th>性別</th><th>生年月日</th><th>所属会社</th>
      </tr>
      <customer
      v-for="customer in customers"
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
      return this.$store.getters._organizations
    },
    customers: function() {
      return this.$store.getters._customers
    }
  }
};
</script>