<template>
  <div id="organizations">
    <router-link to="/">顧客</router-link>
    <router-link :to="{
      name: 'organizationsPage',
      query: {organizations: organizations}
    }">組織</router-link>
    <h1>組織一覧</h1>
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
  data: function() {
    return {
      organizations: this.$route.query.organizations
    }
  }
  // computed: {
  //   organizations: function() {
  //     console.log(this.$route.query.organizations);
  //     return this.$route.query.organizations;
  //   }
  // }
};
</script>