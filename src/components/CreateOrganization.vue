<template>
  <div id="createOrganization">
  <router-link to="/">顧客</router-link>
  <router-link to="/organizations">組織</router-link>
  <h1>組織の追加</h1>
  <span>組織名:</span>
  <input type="text" v-model="organizationName">
  <button class="createButton" v-on:click="createOrganization">追加</button>
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
    createOrganization: function() {
      if (this.organizationName != "") {
        this.$store.commit("addOrganization", { id: this.$store.getters._organizations.length + 1, name: this.organizationName });
      }
    }
  }
};
</script>