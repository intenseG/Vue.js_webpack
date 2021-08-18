<template>
  <div class="organization">
    <li>
      {{ organization.name }}
      <router-link :to="{ name: 'editOrganization', params: { id: organization.id }}">編集</router-link>
    </li>
  </div>
</template>

<script>
export default {
  props: ["organization"],
};
</script>