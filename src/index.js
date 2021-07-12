var app = new Vue({
  el: "#app",
  data: {
    nameCondition: "",
    gender: "指定なし",
    organizationId: 0,
    organizations: [],
    customers: []
  },
  mounted: function() {
    this.setOrganizations().then(() => {
      this.setCustomers();
    });
  },
  methods: {
    setOrganizations: async function() {
      const organizationsElm = document.getElementById('organizations');
      const response = await fetch('./resources/organizations.json');
      const data = await response.json();

      for (let i = 0; i < data.length; i++) {
          const opElm = document.createElement('option');
          opElm.setAttribute('value', data[i].id);
          opElm.textContent = data[i].name;
          organizationsElm.appendChild(opElm);

          const organization = {
            id: data[i].id,
            name: data[i].name
          };
          this.organizations.push(organization);
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
        this.customers.push(customer);
      }
    },
    changeGender: function(event) {
      this.gender = event.target.value;
    },
    getOrganizationName: function(id) {
      let organizationName = "";
      for (let i = 0; i < this.organizations.length; i++) {
        if (this.organizations[i].id == id) {
          organizationName = this.organizations[i].name;
          break;
        }
      }

      return organizationName;
    },
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
          this.customers.push(customer);
        }
      }
    }
  }
})