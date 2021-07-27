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
      gender: "指定なし",
      organizationId: 0
    }
  },
  methods: {
    searchCustomers: async function() {
      const response = await fetch('./resources/customers.json');
      const data = await response.json();

      if (this.customers.length > 0) {
        this.customers.splice(0);
      }

      let words = [];
      if (this.nameCondition && this.nameCondition != "") {
        const _nameCondition = this.nameCondition.replace(/　/g, " "); //全角スぺースを半角に置換

        if (_nameCondition.includes(" ")) {
          words = _nameCondition.split(' ');
        } else {
          words.push(_nameCondition);
        }
      }

      const _customers = data.filter(customer => {
        const results = [];
        if (words.length > 0) {
          for (let i = 0; i < words.length; i++) {
            results.push(customer.name.includes(words[i]));
          }
        } else {
          results.push(true);
        }

        results.push(this.gender == "指定なし" || customer.gender == this.gender);
        results.push(this.organizationId == 0 || customer.organizationId == this.organizationId);

        return !results.includes(false)
      });

      for (let j = 0; j < _customers.length; j++) {
        this.customers.push(_customers[j])
      }
    }
  }
};
</script>