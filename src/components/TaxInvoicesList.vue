<template>
  <div>
    <center>
      <h1>
        <b>Invoices List</b>
      </h1>
    </center>
    <vue-good-table :columns="columns" :rows="invoices" :search-options="{ enabled: true }">
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'products'">
          <li
            v-for="product in props.row.products"
            :key="product.productId"
          >{{ product.productName}}</li>
        </span>
        <span
          v-else-if="props.column.field == 'paymentDue'"
        >{{props.row.totalAmount - props.row.payment}}</span>
        <span v-else-if="props.column.field == 'last'">
          <button @click.stop="deleteRow(this, props.row.id)">Delete</button>
        </span>
        <span v-else>{{props.formattedRow[props.column.field]}}</span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import { VueGoodTable } from "vue-good-table";
import { getInvoices, getOneProduct } from "../repository";
export default {
  name: "taxInvoiceList",
  components: { VueGoodTable },
  data() {
    return {
      invoices: [],
      columns: [
        {
          label: "Invoice Number",
          field: "invoiceNumber"
        },
        {
          label: "Products",
          field: "products"
        },
        {
          label: "Customer Name",
          field: "customerName"
        },
        {
          label: "Total Amount",
          field: "totalAmount"
        },
        {
          label: "Payment Date",
          field: "paymentDate"
        },
        {
          label: "Payment",
          field: "payment"
        },
        {
          label: "Payment Due",
          field: "paymentDue"
        },
        {
          label: "Delievery",
          field: "delMode"
        },
        {
          label: "Options",
          field: "last"
        }
      ]
    };
  },
  mounted() {
    getInvoices()
      .then(data => {
        console.log(data);
        this.invoices = data;
      })
      .catch(err => alert(err));
  },
  methods: {
    deleteRow(event, id) {
      if (confirm("Are you sure you want to delete this invoice?")) {
        deleteProducts(id)
          .then(() => {
            this.$nextTick(() => {
              getInvoices()
                .then(data => (this.invoices = data))
                .catch(err => alert(err));
            });
          })
          .catch(err => alert(err));
      }
    }
  }
};
</script>