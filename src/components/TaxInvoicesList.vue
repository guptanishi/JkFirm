<template>
  <div>
    <center>
      <h1>
        <b>Invoices List</b>
      </h1>
    </center>
    <div style="margin-left: 20px">
      <h4>Search invoices</h4>
    </div>
    <div style="float:right; margin-top:-50px; margin-right: 30px">
      <button class="btn btn-primary" @click="showCashMemo">{{listName}}</button>
    </div>
    <vue-good-table
      :columns="columns"
      :rows="invoices"
      :search-options="{ enabled: true, placeholder:'search invoices' }"
      :pagination-options="{ enabled: true,
        perPage: 15 ,
        nextLabel: 'next',
        prevLabel: 'prev',rowsPerPageLabel: 'invoices per page',
        ofLabel: 'of',
        pageLabel: 'page', // for 'pages' mode
        allLabel: 'All' }"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'products'">
          <li
            v-for="product in props.row.products"
            :key="product.productId"
          >{{ product.productName}}</li>
        </span>
        <span v-else-if="props.column.field == 'invoiceDate'">
        {{props.row.invoiceDate | moment}}
        </span>
        <span
          v-else-if="props.column.field == 'paymentDue'"
        >{{props.row.totalAmount - props.row.payment}}</span>
        <span v-else-if="props.column.field == 'last'">
          <button @click.stop="deleteRow(this, props.row.id)">
            <i class="fa fa-trash-o"></i>
          </button>
          <button style="margin-left:20px" @click.stop="onRowClick(props)">
            <i class="fa fa-pencil"></i>
          </button>
        </span>
        <span v-else>{{props.formattedRow[props.column.field]}}</span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import { VueGoodTable } from "vue-good-table";
import moment from "moment";
import {
  getInvoices,
  getOneProduct,
  deleteInvoice,
  getCashMemos,
  deleteCashMemo
} from "../repository";
export default {
  name: "taxInvoiceList",
  components: { VueGoodTable },
  data() {
    return {
      invoices: [],
      listName: "",
      columns: [
        {
          label: "Invoice Number",
          field: "invoiceNumber",
        },
        {
          label: "Invoice Date",
          field: "invoiceDate"
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
  filters: {
  moment: function (date) {
    return moment(date).format('DD/MM/YYYY HH:MM:ss');
  }
  },
  mounted() {
    if (localStorage.username == "admin") {
      getInvoices()
        .then(data => {
          console.log(data);
          this.invoices = data;
          this.listName = "show Cash Memos";
        })
        .catch(err => alert(err));
    } else {
      this.$router.push({
        name: "login"
      });
    }
  },
  methods: {
    deleteRow(event, id) {
      if (this.listName == "show Cash Memos") {
        if (confirm("Are you sure you want to delete this invoice?")) {
          deleteInvoice(id)
            .then(() => {
              this.$nextTick(() => {
                getInvoices()
                  .then(data => (this.invoices = data))
                  .catch(err => alert(err));
              });
            })
            .catch(err => alert(err));
        }
      } else {
        if (confirm("Are you sure you want to delete this Memo?")) {
          deleteCashMemo(id)
            .then(() => {
              this.$nextTick(() => {
                getCashMemos()
                  .then(data => (this.invoices = data))
                  .catch(err => alert(err));
              });
            })
            .catch(err => alert(err));
        }
      }
    },
    onRowClick(params) {
      this.$router.push({
        name: "taxInvoice",
        params: { data: params.row }
      });
    },
    showCashMemo() {
      if (this.listName == "show Cash Memos") {
        getCashMemos().then(data => {
          this.invoices = data;
          this.listName = "show invoices";
        });
      } else {
        getInvoices()
          .then(data => {
            this.invoices = data;
            this.listName = "show Cash Memos";
          })
          .catch(err => alert(err));
      }
    }
  }
};
</script>