import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import App from "./components/App.vue"
import OrganizationList from "./components/OrganizationList.vue"
import CreateOrganization from './components/CreateOrganization.vue';

Vue.use(VueRouter)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    organizations: [],
    customers: []
  },
  getters: {
    _organizations: state => state.organizations,
    _customers: state => state.customers
  },
  mutations: {
    setOrganizations(state, organizations) {
      state.organizations = organizations;
    },
    setCustomers(state, customers) {
      state.customers = customers;
    },
    addOrganization(state, organization) {
      state.organizations.push(organization);
    }
  },
  actions: {
    async setOrganizationsAsync(context) {
      const response = await fetch('./resources/organizations.json');
      const data = await response.json();
      context.commit('setOrganizations', data);
    },
    async setCustomersAsync(context) {
      const response = await fetch('./resources/customers.json');
      const data = await response.json();
      context.commit('setCustomers', data);
    },
    addOrganization(context, organization) {
      context.commit('addOrganization', organization);
    }
  }
})

const routes = [
  {
    path: '/',
    component: App
  },
  {
    path: '/organizations',
    name: 'organizationsPage',
    component: OrganizationList,
    props: route => ({ organizations: route.query.organizations })
  },
  {
    path: '/organizations/create',
    component: CreateOrganization,
  }
];

const router = new VueRouter({
  routes
});

const app = new Vue({
  el: "#app",
  store,
  router,
  created: function() {
    store.dispatch('setOrganizationsAsync').then(() => {
      store.dispatch('setCustomersAsync');
    });
  },
  template: `
    <div id="app">
      <router-view></router-view>
    </div>
  `
}).$mount('#app')