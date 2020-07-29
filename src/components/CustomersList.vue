<template>
  <div>
    <center>
      <h1>
        <b>Customers</b>
      </h1>
    </center>
    <div style="margin-left: 20px">
      <h4>Search customers</h4>
    </div>
    <vue-good-table
      :columns="columns"
      :rows="customers"
      @on-row-click="onRowClick"
      :search-options="{ enabled: true, placeholder: 'Search customers' }"
      :pagination-options="{ enabled: true,
        perPage: 5,
        nextLabel: 'next',
        prevLabel: 'prev',rowsPerPageLabel: 'Records per page',
        ofLabel: 'of',
        pageLabel: 'page', // for 'pages' mode
        allLabel: 'All' }"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'last'">
          <button @click.stop="deleteRow(this, props.row.id)">
            <i class="fa fa-trash-o"></i>
          </button>
          <button style="margin-left:20px" @click.stop="onRowClick(props)">
            <i class="fa fa-pencil"></i>
          </button>
        </span>
        <span v-else style="width: 50px">{{props.formattedRow[props.column.field]}}</span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import { VueGoodTable } from "vue-good-table";
import { deleteCustomer, getCustomers } from "../repository";
export default {
  name: "getCustomers",
  components: { VueGoodTable },
  props: ["onModal"],
  data() {
    return {
      customers: [],
      columns: [
        {
          label: "Id",
          field: "customerId"
        },
        {
          label: "Name",
          field: "customerName"
        },
        {
          label: "Address",
          field: "address"
        },
        {
          label: "City",
          field: "city"
        },
        {
          label: "State",
          field: "state"
        },
        {
          label: "Pin Code",
          field: "pincode"
        },
        {
          label: "Phone No.",
          field: "contact"
        },
        {
          label: "Email Id",
          field: "emailId"
        },
        {
          label: "GST No.",
          field: "gstNumber"
        },

        {
          label: "option",
          field: "last"
        }
      ]
    };
  },
  mounted() {
    if (localStorage.username == "admin") {
      getCustomers()
        .then(data => (this.customers = data))
        .catch(err => alert(err));
    } else {
      this.$router.push({
        name: "login"
      });
    }
  },
  methods: {
    onRowClick(params) {
      if (this.$router.currentRoute.name == "loadCustomers")
        this.$router.push({
          name: "updateCustomer",
          params: { data: params.row }
        });
      else {
        this.$emit("customerRowClicked", params.row);
      }
    },
    deleteRow(event, id) {
      if (confirm("Are you sure you want to delete this customer?")) {
        deleteCustomer(id)
          .then(() => {
            this.$nextTick(() => {
              getCustomers()
                .then(data => (this.customers = data))
                .catch(err => alert(err));
            });
          })
          .catch(err => alert(err));
      }
    }
  }
};
</script>

<style>
.vgt-global-search {
  margin-bottom: 20px;
  margin-top: -40px;
  width: 50%;
  margin-right: 30%;
  float: right;
}
</style>