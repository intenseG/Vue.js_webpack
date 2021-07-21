Vue.component("search-field", {
  props: ["nameCondition", "gender", "organizationId", "organizations"],
  methods: {
    searchCustomers: async function() {
      const response = await fetch('./resources/customers.json');
      const data = await response.json();

      if (this.customers.length > 0) {
        this.customers.splice(0);
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
        if (this.gender != null &&
            data[i].gender != this.gender) continue;
        if (this.organizationId != null &&
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
      <input type="radio" id="unspecified" value="指定なし" checked v-model="gender">
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
      <button class="searchButton" v-on:click="searchCustomers">検索</button>
    </div>
  `
});

Vue.component("customer", {
  props: ["customer", "organizations"],
  methods: {
    getOrganizationName: function() {
      let organizationName = "";
      for (let i = 0; i < organizations.length; i++) {
        if (organizations[i].id == customer.organizationId) {
          organizationName = organizations[i].name;
          break;
        }
      }

      return organizationName;
    }
  },
  template: `
    <div id="customer">
      <tr>
        <td>{{ customer.id }}</td>
        <td>{{ customer.name }}</td>
        <td>{{ customer.gender }}</td>
        <td>{{ customer.birthday }}</td>
        <td>{{ getOrganizationName() }}</td>
      </tr>
    </div>
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
    nameCondition: null,
    gender: null,
    organizationId: null,
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

      // for (let i = 0; i < data.length; i++) {
      //     const organization = {
      //       id: data[i].id,
      //       name: data[i].name
      //     };
      //     this.organizationArray.push(organization);
      // }
    },
    setCustomers: async function() {
      const response = await fetch('./resources/customers.json');
      const data = await response.json();

      this.customerArray = data;

      // for (let i = 0; i < data.length; i++) {
      //   const customer = {
      //     id: data[i].id,
      //     name: data[i].name,
      //     gender: data[i].gender,
      //     birthday: data[i].birthday,
      //     organizationId: data[i].organizationId
      //   };
      //   this.customerArray.push(customer);
      // }
    }
    // getOrganizationName: function(id) {
    //   let organizationName = "";
    //   for (let i = 0; i < this.organizations.length; i++) {
    //     if (this.organizations[i].id == id) {
    //       organizationName = this.organizations[i].name;
    //       break;
    //     }
    //   }

    //   return organizationName;
    // },
    // searchCustomers: async function() {
    //   const response = await fetch('./resources/customers.json');
    //   const data = await response.json();

    //   if (this.customers.length > 0) {
    //     this.customers.splice(0);
    //   }

    //   let words = [];
    //   if (this.nameCondition != "") {
    //     this.nameCondition = this.nameCondition.replace(/　/g, " "); //全角スぺースを半角に置換

    //     if (this.nameCondition.includes(" ")) {
    //       words = this.nameCondition.split(' ');
    //     } else {
    //       words.push(this.nameCondition);
    //     }
    //   }

    //   for (let i = 0; i < data.length; i++) {
    //     if (this.gender != null &&
    //         data[i].gender != this.gender) continue;
    //     if (this.organizationId != null &&
    //         data[i].organizationId != this.organizationId) continue;

    //     let isOK = true;
    //     for (let j = 0; j < words.length; j++) {
    //       if (!data[i].name.includes(words[j])) {
    //         isOK = false;
    //         break;
    //       }
    //     }

    //     if (isOK) {
    //       const organizationName = this.getOrganizationName(data[i].organizationId);
    //       const customer = {
    //         id: data[i].id,
    //         name: data[i].name,
    //         gender: data[i].gender,
    //         birthday: data[i].birthday,
    //         organization: organizationName
    //       };
    //       this.customers.push(customer);
    //     }
    //   }
    // }
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