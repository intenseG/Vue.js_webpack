import SearchField from "./components/SearchField.vue"
import CustomerTable from "./components/CustomerTable.vue"

const app = new Vue({
  el: "#app",
  data: {
    organizationArray: [],
    customerArray: []
  },
  template: `
    <div id="app">
      <template>
        <search-field
        v-bind:customers="customers"
        v-bind:organizations="organizations">
        </search-field>
        <customer-table
        v-bind:customers="customers"
        v-bind:organizations="organizations">
        </customer-table>
      </template>
    </div>
  `,
  components: {
    SearchField, CustomerTable
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