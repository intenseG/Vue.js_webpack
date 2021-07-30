<template>
  <tr>
      <td>{{ customer.id }}</td>
      <td>{{ customer.name }}</td>
      <td>{{ customer.gender }}</td>
      <td>{{ customer.birthday }}</td>
      <td>{{ getOrganizationName() }}</td>
  </tr>
</template>

<script>
export default {
  props: ["customer", "organizations"],
  methods: {
    getOrganizationName: function() {
      const target = this.customer.organizationId;
      const result = this.organizations.find(function(org) {
        return org.id === target
      });

      return result.name;
    }
  }
};
</script>