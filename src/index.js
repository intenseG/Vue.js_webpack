import SearchField from "./components/SearchField.vue"
import CustomerTable from "./components/CustomerTable.vue"
import OrganizationList from "./components/OrganizationList.vue"
import App from "./components/App.vue"

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
  }
];

const router = new VueRouter({
  routes
});

const app = new Vue({
  el: "#app",
  template: `
    <div id="app">
      <router-view></router-view>
    </div>
  `,
  router
}).$mount('#app')