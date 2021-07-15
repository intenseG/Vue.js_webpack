Vue.component("search-field", {
  props: ["name-condition", "gender", "organization-id", "organizations"],
  methods: {
    searchCustomers() {
      this.$emit('click');
    }
  },
  template: `
    <div id="conditions">
      <span class="title">氏名</span>
      <input type="text" v-model="name-condition">
      <span class="title">性別</span>
      <label for="unspecified">指定なし</label>
      <input type="radio" id="unspecified" value="指定なし" checked v-model="gender">
      <label for="man">男性</label>
      <input type="radio" id="man" value="男" v-model="gender">
      <label for="woman">女性</label>
      <input type="radio" id="woman" value="女" v-model="gender">
      <span class="title">組織</span>
      <select v-for="org in organizations" v-model="organization-id">
        <option value="0">選択なし</option>
        <option :value="org.id">{{ org.name }}</option>
      </select>
      <br>
      <button class="searchButton" v-on:click="searchCustomers">検索</button>
    </div>
  `
});

Vue.component("customer-table", {
  template: `
    <div id="customerTable">
      <table rules="rows">
        <tr>
          <th>ID</th><th>氏名</th><th>性別</th><th>生年月日</th><th>所属会社</th>
        </tr>
      </table>
    </div>
  `
});

Vue.component("customer", {
  props: ["customer"],
  template: `
    <div id="customer">
      <tr>
        <td v-text="customer.id"></td>
        <td v-text="customer.name"></td>
        <td v-text="customer.gender"></td>
        <td v-text="customer.birthday"></td>
        <td v-text="customer.organization"></td>
      </tr>
    </div>
  `
});

var app = new Vue({
  el: "#app",
  data: {
    nameCondition: "",
    gender: "指定なし",
    organizationId: 0,
    organizationArray: [],
    customerArray: []
  },
  // mounted: function() {
  //   this.setOrganizations().then(() => {
  //     this.setCustomers();
  //   });
  // },
  methods: {
    setOrganizations: async function() {
      const organizationsElm = document.getElementById('organizations');
      const response = await fetch('./resources/organizations.json');
      const data = await response.json();

      for (let i = 0; i < data.length; i++) {
          // const opElm = document.createElement('option');
          // opElm.setAttribute('value', data[i].id);
          // opElm.textContent = data[i].name;
          // organizationsElm.appendChild(opElm);

          const organization = {
            id: data[i].id,
            name: data[i].name
          };
          this.organizationArray.push(organization);
      }
    },
    setCustomers: async function() {
      const response = await fetch('./resources/customers.json');
      const data = await response.json();

      for (let i = 0; i < data.length; i++) {
        const organizationName = this.getOrganizationName(data[i].organizationId);
        const customer = {
          id: data[i].id,
          name: data[i].name,
          gender: data[i].gender,
          birthday: data[i].birthday,
          organization: organizationName
        };
        this.customerArray.push(customer);
      }
    },
    getOrganizationName: function(id) {
      let organizationName = "";
      for (let i = 0; i < this.organizationArray.length; i++) {
        if (this.organizationArray[i].id == id) {
          organizationName = this.organizationArray[i].name;
          break;
        }
      }

      return organizationName;
    },
    searchCustomers: async function() {
      const response = await fetch('./resources/customers.json');
      const data = await response.json();

      if (this.customerArray.length > 0) {
        this.customerArray.splice(0);
      }

      let words = [];
      if (this.nameCondition != "") {
        this.nameCondition = this.nameCondition.replace(/　/g, " "); //全角スぺースを半角に置換

        if (this.nameCondition.includes(" ")) {
          words = this.nameCondition.split(' ');
        } else {
          words.push(this.nameCondition);
        }
      }

      for (let i = 0; i < data.length; i++) {
        if (this.gender != "指定なし" &&
            data[i].gender != this.gender) continue;
        if (this.organizationId > 0 &&
            data[i].organizationId != this.organizationId) continue;

        let isOK = true;
        for (let j = 0; j < words.length; j++) {
          if (!data[i].name.includes(words[j])) {
            isOK = false;
            break;
          }
        }

        if (isOK) {
          const organizationName = this.getOrganizationName(data[i].organizationId);
          const customer = {
            id: data[i].id,
            name: data[i].name,
            gender: data[i].gender,
            birthday: data[i].birthday,
            organization: organizationName
          };
          this.customerArray.push(customer);
        }
      }
    }
  },
  computed: {
    organizations: function() {
      this.setOrganizations();
      return this.organizationArray;
    },
    customers: function () {
      this.searchCustomers();
      return this.customerArray;
    }
  }
})