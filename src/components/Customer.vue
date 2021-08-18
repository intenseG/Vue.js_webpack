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
  props: ["customer"],
  methods: {
    getOrganizationName: function() {
      const target = this.customer.organizationId;
      const result = this.organizations.find(function(org) {
        return org.id === target
      });

      return result.name;
    }
  },
  computed: {
    organizations: function() {
      return this.$store.getters._organizations
    }
  }
};
</script>