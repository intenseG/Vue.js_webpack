Vue.component("search-field", {
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
  },
  template: `
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
        <option v-for="org in organizations" :value="org.id">{{ org.name }}</option>
      </select>
      <br>
      <button class="searchButton" v-on:click="searchCustomers(nameCondition, gender, organizationId)">検索</button>
    </div>
  `
});

Vue.component("customer", {
  props: ["customer", "organizations"],
  methods: {
    getOrganizationName: function() {
      const target = this.customer.organizationId;
      const result = this.organizations.find(function(org) {
        return org.id === target
      });

      return result.name;
    }
  },
  template: `
    <tr>
      <td>{{ customer.id }}</td>
      <td>{{ customer.name }}</td>
      <td>{{ customer.gender }}</td>
      <td>{{ customer.birthday }}</td>
      <td>{{ getOrganizationName() }}</td>
    </tr>
  `
});

Vue.component("customer-table", {
  props: ["customers", "organizations"],
  template: `
    <div id="customerTable">
      <table rules="rows">
        <tr>
          <th>ID</th><th>氏名</th><th>性別</th><th>生年月日</th><th>所属会社</th>
        </tr>
        <customer
        v-for="customer in customers"
        v-bind:customer="customer"
        v-bind:key="customer.id"
        v-bind:organizations="organizations">
        </customer>
      </table>
    </div>
  `
});

var app = new Vue({
  el: "#app",
  data: {
    organizationArray: [],
    customerArray: []
  },
  created: function() {
    this.setOrganizations().then(() => {
      this.setCustomers();
    });
  },
  methods: {
    setOrganizations: async function() {
      const response = await fetch('./resources/organizations.json');
      const data = await response.json();

      this.organizationArray = data;
    },
    setCustomers: async function() {
      const response = await fetch('./resources/customers.json');
      const data = await response.json();

      this.customerArray = data;
    }
  },
  computed: {
    organizations: function() {
      return this.organizationArray;
    },
    customers: function() {
      return this.customerArray;
    }
  }
})