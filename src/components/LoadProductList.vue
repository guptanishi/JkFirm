<template>
    <div>
        <center><h1><b>Available Stock Status</b></h1></center>
        <vue-good-table
            :columns="columns"
            :rows="products"
             @on-row-click="onRowClick"
            :search-options="{ enabled: true }">
               <template slot="table-row" slot-scope="props">
                  <span v-if="props.column.field == 'last'">
                    <button @click.stop="deleteRow(this, props.row.id)">Delete</button>
                  </span>
                  <span v-else>
                    {{props.formattedRow[props.column.field]}}
                  </span>
              </template>
        </vue-good-table>

    </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table';
import { getProducts, deleteProducts }  from '../repository';
export default {
  name: 'loadproductList',
  components: { VueGoodTable },
  props:['onModal'],
  data(){
    return {
      products: [],
       columns: [
        {
          label: 'Product Code',
          field: 'productCode',
        },
        {
          label: 'Product Name',
          field: 'productName',
        },
        {
          label: 'Cost Price',
          field: 'costPrice',
        },
        {
          label: 'Price',
          field: 'price',
        },
        {
          label: 'Unit',
          field: 'unit',
        },
        {
          label: 'Vat',
          field: 'vat',
        },
        {
          label: 'Quantity Available',
          field: 'qtyAvailable'
        },
        {
          label: 'HSN',
          field: 'HSN'
        },
        {
          label: 'Option',
          field: 'last'
        }
      ],
    }
  },
  mounted(){
    getProducts()
      .then(data => this.products = data)
      .catch((err =>alert(err)));
    } ,
    methods: {
        onRowClick(params){
          if(!this.onModal)
            this.$router.push({name:'updateProduct', params: {data: params.row}});
          else{
            this.$emit('productRowClicked', params.row);
          }
        },
        deleteRow(event,id){
           if(confirm('Are you sure you want to delete this product?')){
              deleteProducts(id)
                .then(() => {
                  this.$nextTick(() => {
                    getProducts()
                      .then(data => this.products = data)
                      .catch((err =>alert(err)));
                  })
                })
              .catch((err =>alert(err)));
           }
        }
    }

}
</script>