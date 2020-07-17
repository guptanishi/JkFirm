<template>
  <div class="container">
    <div class="row">
      <div class="col-6 text-center">
        <router-link :to="{ name: 'loadproductList' }" class="nav-link">
          <img src="../../public/product.png" width="150px" height="150px" />
          <br />
          <span class="textStyle">Product List</span>
        </router-link>
      </div>
      <div class="col-6 text-center">
        <router-link to="/createProduct" class="nav-link">
          <img src="../../public/buy.png" width="150px" height="150px" />
          <br />
          <span class="textStyle">Create Products</span>
        </router-link>
      </div>
    </div>
    <div class="row top-margin">
      <div class="col-6 text-center">
        <router-link to="/getCustomers" class="nav-link">
          <img src="../../public/customer.png" width="150px" height="150px" />
          <br />
          <span class="textStyle">Customers List</span>
        </router-link>
      </div>
      <div class="col-6 text-center">
        <router-link to="/createCustomer" class="nav-link">
          <img src="../../public/add.png" width="150px" height="150px" />
          <br />
          <span class="textStyle">Create Customers</span>
        </router-link>
      </div>
    </div>
    <div class="row top-margin">
      <div class="col-6 text-center">
        <router-link to="/taxInvoice" class="nav-link">
          <img src="../../public/form.png" width="150px" height="150px" />
          <br />
          <span class="textStyle">Tax Invoice</span>
        </router-link>
      </div>
      <div class="col-6 text-center">
        <router-link to="/getInvoices" class="nav-link">
          <img src="../../public/bill.png" width="150px" height="150px" />
          <br />
          <span class="textStyle">Invoices List</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homePage"
};
</script>
<style>
.textStyle {
  margin-top: 20px;
  font-size: 32px;
  font-weight: bold;
}
.top-margin {
  margin-top: 20px;
}
</style>