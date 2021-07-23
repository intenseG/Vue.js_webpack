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
    <button class="searchButton" v-on:click="searchCustomers(nameCondition, gender, organizationId)">検索</button>
  </div>
</template>

<script>
export default {
  props: ["customers", "organizations"],
  data: function () {
    return {
      nameCondition: "",
      gender: "指定なし",
      organizationId: 0
    }
  },
  methods: {
    searchCustomers: async function(nameCondition, gender, organizationId) {
      const response = await fetch('./resources/customers.json');
      const data = await response.json();

      if (this.customers.length > 0) {
        this.customers.splice(0);
      }

      let words = [];
      if (nameCondition && nameCondition != "") {
        const _nameCondition = nameCondition.replace(/　/g, " "); //全角スぺースを半角に置換

        if (_nameCondition.includes(" ")) {
          words = _nameCondition.split(' ');
        } else {
          words.push(_nameCondition);
        }
      }

      for (let i = 0; i < data.length; i++) {
        if (gender != null &&
            gender != "指定なし" &&
            data[i].gender != gender) continue;
        if (organizationId != null &&
            organizationId != 0 &&
            data[i].organizationId != organizationId) continue;

        let isOK = true;
        for (let j = 0; j < words.length; j++) {
          if (!data[i].name.includes(words[j])) {
            isOK = false;
            break;
          }
        }

        if (isOK) {
          const customer = {
            id: data[i].id,
            name: data[i].name,
            gender: data[i].gender,
            birthday: data[i].birthday,
            organizationId: data[i].organizationId
          };
          this.customers.push(customer);
        }
      }
    }
  }
};
</script>