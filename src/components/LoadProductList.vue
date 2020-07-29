<template>
  <div>
    <center>
      <h1>
        <b>Products</b>
      </h1>
    </center>
    <div style="margin-left: 20px">
      <h4>Search products</h4>
    </div>
    <vue-good-table
      :columns="columns"
      :rows="products"
      :search-options="{ enabled: true, placeholder: 'Search products', }"
      @on-row-click="onRowClick"
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
        <span v-else>{{props.formattedRow[props.column.field]}}</span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import { VueGoodTable } from "vue-good-table";
import { getProducts, deleteProducts } from "../repository";
export default {
  name: "loadproductList",
  components: { VueGoodTable },
  props: ["onModal"],
  data() {
    return {
      products: [],
      columns: [
        {
          label: "Product Code",
          field: "productCode"
        },
        {
          label: "Product Name",
          field: "productName"
        },
        {
          label: "Cost Price",
          field: "costPrice"
        },
        {
          label: "Price",
          field: "price"
        },
        {
          label: "Unit",
          field: "unit"
        },
        {
          label: "GST",
          field: "vat"
        },
        {
          label: "Stock Available",
          field: "qtyAvailable"
        },
        {
          label: "HSN",
          field: "HSN"
        },
        {
          label: "Option",
          field: "last"
        }
      ]
    };
  },
  mounted() {
    if (localStorage.username == "admin") {
      getProducts()
        .then(data => (this.products = data))
        .catch(err => alert(err));
    } else {
      this.$router.push({
        name: "login"
      });
    }
  },
  methods: {
    onRowClick(params) {
      if (this.$router.currentRoute.name == "loadproductList")
        this.$router.push({
          name: "updateProduct",
          params: { data: params.row }
        });
      else {
        this.$emit("productRowClicked", params.row);
      }
    },
    deleteRow(event, id) {
      if (confirm("Are you sure you want to delete this product?")) {
        deleteProducts(id)
          .then(() => {
            this.$nextTick(() => {
              getProducts()
                .then(data => (this.products = data))
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
  width: 55%;
  margin-right: 30%;
  float: right;
}
</style>