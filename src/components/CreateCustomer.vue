<template>
  <div id="createCustomer">
  <router-link to="/">顧客</router-link>
  <router-link to="/organizations">組織</router-link>
  <div class="createCustomerMessage">{{ message }}</div>
  <h1>顧客の追加</h1>
  <span>氏名:</span>
  <input type="text" v-model="customerName">
  <div class="createCustomerNewLine"></div>
  <span>性別:</span>
  <label for="man">男性</label>
  <input type="radio" id="man" value="男" v-model="gender">
  <label for="woman">女性</label>
  <input type="radio" id="woman" value="女" v-model="gender">
  <div class="createCustomerNewLine"></div>
  <span>生年月日:</span>
  <input type="text" v-model="birthday">
  <div class="createCustomerNewLine"></div>
  <span>所属会社:</span>
  <select v-model="organizationId">
    <option value="0">選択なし</option>
    <option v-for="org in organizations" :key="org.id" :value="org.id">{{ org.name }}</option>
  </select>
  <div class="createCustomerNewLine"></div>
  <button class="createCustomerButton" v-on:click="createCustomer">追加</button>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      customerName: "",
      gender: null,
      birthday: null,
      organizationId: null,
      message: ""
    }
  },
  methods: {
    initForm: function() {
      this.customerName = "";
      this.gender = null;
      this.birthday = null;
      this.organizationId = null;
    },
    createCustomer: function() {
      console.log(this.customerName);
      console.log(this.gender);
      console.log(this.birthday);
      console.log(this.organizationId);
      if (this.customerName === "") {
        this.message = "氏名は必須です";
        return;
      }
      if (this.gender === null) {
        this.message = "性別が未選択です";
        return;
      }
      if (this.birthday === null) {
        this.message = "生年月日は必須です";
        return;
      }
      if (this.organizationId === null || this.organizationId <= 0) {
        this.message = "所属会社が未選択です";
        return;
      }

      this.$store.dispatch("addCustomer",
      {
        id: this.customers.length + 1,
        name: this.customerName,
        gender: this.gender,
        birthday: this.birthday,
        organizationId: this.organizationId
      }).then(() => {
        this.initForm();
        this.message = "登録が完了しました";
      });
    }
  },
  computed: {
    organizations: function() {
      return this.$store.getters._organizations;
    },
    customers: function() {
      return this.$store.getters._customers;
    }
  }
}
</script>