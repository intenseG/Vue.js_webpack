<template>
  <div id="editOrganization">
  <router-link to="/">顧客</router-link>
  <router-link to="/organizations">組織</router-link>
  <h1>組織情報の編集</h1>
  <span>組織名:</span>
  <input type="text" v-model="organizationName">
  <button class="confirmButton" v-on:click="confirmOrganizationName">確定</button>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      organizationName: ""
    }
  },
  methods: {
    confirmOrganizationName: function() {
      if (this.organizationName != "") {
        this.$store.commit("editOrganizationName", { id: this.$route.params.id, name: this.organizationName });
      }
    }
  }
};
</script>