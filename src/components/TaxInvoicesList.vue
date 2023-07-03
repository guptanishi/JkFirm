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

      <download-excel :data="invoices" :fields= "json_fields">
        <button class="btn btn-primary"> Export Data</button>
      </download-excel>
     
    </div>
    <vue-good-table
      :columns="columns"
      :isLoading.sync="isLoading"
      :rows="invoices"
      :search-options="{ enabled: true, placeholder:'search invoices' }"
      :pagination-options="{ enabled: true,
      
        perPage: 100 ,
        nextLabel: 'next',
        prevLabel: 'prev',
        rowsPerPageLabel: 'invoices per page',
        ofLabel: 'of',
        pageLabel: 'page', // for 'pages' mode
        allLabel: 'All' ,
        mode: 'pages'
        }"
         @on-row-click="getRowIndex"
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
        
        <span v-else-if="props.column.field == 'last'">
          <button @click.stop="deleteRow(this, props.row.id)">
            <i class="fa fa-trash-o "></i>
          </button>
          <button style="margin-left:20px" @click.stop="onRowClick(props)">
            <i class="fa fa-pencil"></i>
          </button>
           <button style="margin-left:20px" @click.stop="downloadInvoice(props)">
            <i class="fa fa-download"></i>
          </button>
        </span>
        <span v-else>{{props.formattedRow[props.column.field]}}</span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import Vue from "vue";
import { VueGoodTable } from "vue-good-table";
import JsonExcel from "vue-json-excel";

Vue.component("downloadExcel", JsonExcel);

import moment from "moment";
import {
  getInvoices,
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
      isLoading: false,

      allowedKeys: [
        "invoiceNumber",
        "invoiceDate",
        "products",
        "customerId",
        "customerName",
        "address",
        "state",
        "contact",
        "gstNumber",
        "totalAmount",
        "paymentDate"
      ],
      json_fields: {
        "Invoice Number": "invoiceNumber",
        "Invoice Date": {
          field: "invoiceDate",
          callback: value => {
            const date = new Date(value);
            return date.toLocaleDateString("en-GB");
          }
        },
        Products: {
          field: "products",
          callback: value => {
            let stringValue = "";
            value.forEach((product, index) => {
              stringValue =
                stringValue + `${index + 1}. ${product.productName}\n`;
            });

            return stringValue;
          }
        },
        "Customer Id": "customerId",
        "Customer Name": "customerName",
        Address: "address",
        state: "state",
        contact: "contact",
        "GST Number": "gstNumber",
        totalAmount: "totalAmount"
      },

      columns: [
        {
          label: "Invoice Number",
          field: "invoiceNumber"
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

  computed: {
    exportData: function() {
      let exportedArray = [];
      this.invoices.map(invoice => {
        const filtered = Object.keys(invoice)
          .filter(key => this.allowedKeys.includes(key))
          .reduce((obj, key) => {
            obj[key] = invoice[key];
            return obj;
          }, {});
        exportedArray.push(filtered);
      });

      return JSON.stringify(exportedArray);
    }
  },
  filters: {
    moment: function(date) {
      return moment(date).format("DD/MM/YYYY HH:MM:ss");
    }
  },
  mounted() {
    if (localStorage.username == "admin") {
      this.isLoading = true;
      getInvoices()
        .then(data => {
          this.isLoading = false;
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
    downloadInvoice(params) {
      this.$router.push({
        name: "taxInvoice",
        params: { data: params.row, action: "download" }
      });
    },
    onRowClick(params) {
      this.$router.push({
        name: "taxInvoice",
        params: { data: params.row }
      });
    },

    getRowIndex(params) {
      alert(params.pageIndex);
    }
  }
};
</script>
