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
  props: ["customers", "organizations"],
  components: {
    Customer
  }
};
</script>