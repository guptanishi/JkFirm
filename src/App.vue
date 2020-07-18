<template>
  <div id="app">
    <nav class="navbar navbar-light navbar-expand-lg bg-light justify-content-between">
      <a class="navbar-brand">
        <router-link :to="{ name: 'homePage' }" class="nav-link">
          <h1>JKFIRM</h1>
        </router-link>
      </a>
      <div id="navbarNavDropdown" v-if="isAuthenticated">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :to="{ name: 'loadproductList' }" class="nav-link">
              <img src="../public/product.png" width="60px" height="60px" />
              <br />
              <span>Product List</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/createProduct" class="nav-link">
              <img src="../public/buy.png" width="60px" height="60px" />
              <br />
              <span>Create Products</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/getCustomers" class="nav-link">
              <img src="../public/customer.png" width="60px" height="60px" />
              <br />
              <span>Customers List</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/createCustomer" class="nav-link">
              <img src="../public/add.png" width="60px" height="60px" />
              <br />
              <span>Create Customer</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/taxInvoice" class="nav-link">
              <img src="../public/form.png" width="60px" height="60px" />
              <br />
              <span>Tax Invoice</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/getInvoices" class="nav-link">
              <img src="../public/bill.png" width="60px" height="60px" />
              <br />
              <span>Invoice List</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="nav-item dropdown" v-if="showName" style="margin-right: 30px">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >{{name}}</a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" @click="logout">Logout</a>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { EventBus } from "../event-bus";
export default {
  name: "app",

  data() {
    return {
      isAuthenticated: "",
      name: localStorage.username != undefined ? localStorage.username : "",
      showName: false
    };
  },
  watch: {
    $route(to, from) {
      if (to != from) {
        this.name = localStorage.username;
      }
      if (to.name == "login" || to.name == "homePage") {
        this.isAuthenticated = false;
      } else {
        this.isAuthenticated = true;
      }

      if (to.name != "login" && from.name != "login") {
        this.showName = true;
      }
    }
  },
  methods: {
    logout() {
      localStorage.username = "";
      localStorage.password = "";
      this.$router.push({
        name: "login"
      });
    }
  }
};
</script>
