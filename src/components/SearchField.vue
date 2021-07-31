<template>
  <div id="conditions">
    <span class="title">氏名</span>
    <input type="text" v-model="nameCondition">
    <span class="title">性別</span>
    <label for="unspecified">指定なし</label>
    <input type="radio" id="unspecified" value="指定なし" v-model="gender" checked>
    <label for="man">男性</label>
    <input type="radio" id="man" value="男" v-model="gender">
    <label for="woman">女性</label>
    <input type="radio" id="woman" value="女" v-model="gender">
    <span class="title">組織</span>
    <select v-model="organizationId">
      <option value="0">選択なし</option>
      <option v-for="org in organizations" :key="org.id" :value="org.id">{{ org.name }}</option>
    </select>
    <br>
    <button class="searchButton" v-on:click="searchCustomers">検索</button>
  </div>
</template>

<script>
export default {
  props: ["customers", "organizations"],
  data: function() {
    return {
      nameCondition: "",
      gender: null,
      organizationId: null
    }
  },
  methods: {
    isName: function(name, word) {
      return name.includes(word);
    },
    isGender: function(gender) {
      return this.gender == null || this.gender == "指定なし" || gender == this.gender;
    },
    isOrganizationId: function(organizationId) {
      return this.organizationId == null || this.organizationId == 0 || organizationId == this.organizationId;
    },
    searchCustomers: async function() {
      const response = await fetch('./resources/customers.json');
      const data = await response.json();

      if (this.customers.length > 0) {
        this.customers.splice(0);
      }

      const _nameCondition = this.nameCondition.replace(/　/g, " "); //全角スぺースを半角に置換
      const words = _nameCondition.split(" ");

      const _customers = data.filter(customer => {
        const results = [];
        if (this.nameCondition === "") {
          results.push(true);
        } else {
          const targetWords = words.filter(word => {
            return this.isName(customer.name, word)
          });
          results.push(targetWords.length == words.length);
        }

        results.push(this.isGender(customer.gender));
        results.push(this.isOrganizationId(customer.organizationId));

        return !results.includes(false)
      });

      for (let j = 0; j < _customers.length; j++) {
        this.customers.push(_customers[j])
      }
    }
  }
};
</script>