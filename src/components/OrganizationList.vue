<template>
  <div id="organizations">
    <router-link to="/">顧客</router-link>
    <router-link to="organizations">組織</router-link>
    <h1>組織一覧</h1>
    <router-link to="/organizations/create">組織を追加</router-link>
    <ul>
      <organization
      v-for="organization in organizations"
      v-bind:organization="organization"
      v-bind:key="organization.id">
      </organization>
    </ul>
  </div>
</template>

<script>
import Organization from './Organization.vue';
export default {
  components: {
    Organization
  },
  computed: {
    organizations: function() {
      return this.$store.getters._organizations
    }
  }
};
</script>