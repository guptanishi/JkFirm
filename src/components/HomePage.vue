<template>
  <div class="container">
    <div class="row">
      <div class="col-6 text-center">
        <router-link :to="{ name: 'loadproductList' }" class="nav-link">
          <div class="shadow p-3 mb-5 bg-white rounded">
            <img src="../../public/order.png" width="80px" height="80px" />
            <br />
            <span class="textStyle">Product List</span>
          </div>
        </router-link>
      </div>
      <div class="col-6 text-center">
        <router-link to="/createProduct" class="nav-link">
          <div class="shadow p-3 mb-5 bg-white rounded">
            <img src="../../public/parcel.png" width="80px" height="80px" />
            <br />
            <span class="textStyle">Create Products</span>
          </div>
        </router-link>
      </div>
    </div>
    <div class="row top-margin">
      <div class="col-6 text-center">
        <router-link to="/getCustomers" class="nav-link">
          <div class="shadow p-3 mb-5 bg-white rounded">
            <img src="../../public/customer.png" width="80px" height="80px" />
            <br />
            <span class="textStyle">Customers List</span>
          </div>
        </router-link>
      </div>
      <div class="col-6 text-center">
        <router-link to="/createCustomer" class="nav-link">
          <div class="shadow p-3 mb-5 bg-white rounded">
            <img src="../../public/add.png" width="80px" height="80px" />
            <br />
            <span class="textStyle">Create Customers</span>
          </div>
        </router-link>
      </div>
    </div>
    <div class="row top-margin">
      <div class="col-6 text-center">
        <router-link to="/taxInvoice" class="nav-link">
          <div class="shadow p-3 mb-5 bg-white rounded">
            <img src="../../public/form.png" width="80px" height="80px" />
            <br />
            <span class="textStyle">Tax Invoice</span>
          </div>
        </router-link>
      </div>
      <div class="col-6 text-center">
        <router-link to="/getInvoices" class="nav-link">
          <div class="shadow p-3 mb-5 bg-white rounded">
            <img src="../../public/bill.png" width="80px" height="80px" />
            <br />
            <span class="textStyle">Invoices List</span>
          </div>
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
  font-size: 22px;
  font-weight: bold;
}
.top-margin {
  margin-top: 20px;
}
</style>