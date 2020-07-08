<template>
  <div id="app">
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <div class="container level">
        <div class="navbar-brand level-left">
          <a class="navbar-item" href="#">
            <span class="title is-size-1">CRUD</span>
          </a>
        </div>
        <div class="level-right">
          <p class="level-item">
            <router-link :to="{ name: 'loadproductList' }">Product List</router-link>
          </p>
          <p class="level-item">
            <router-link to="/createProduct">Create New Product</router-link>
          </p>
          <p class="level-item">
            <router-link to="/getCustomers">Customers List</router-link>
          </p>
          <p class="level-item">
            <router-link to="/createCustomer">Create Customer</router-link>
          </p>
          <p class="level-item">
            <router-link to="/taxInvoice">Tax Invoice</router-link>
          </p>
          <p class="level-item">
            <router-link to="/getInvoices">Invoice List</router-link>
          </p>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>
