<template>
    <div>
        <center><h1><b>Customers List</b></h1></center>
        <vue-good-table
            :columns="columns"
            :rows="customers"
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
import { deleteCustomer, getCustomers }  from '../repository';
export default {
  name: 'getCustomers',
  components: { VueGoodTable },
  props:['onModal'],
  data(){
    return {
      customers: [],
       columns: [
        {
          label: 'Customer Id',
          field: 'customerId',
        },
        {
          label: 'Customer Name',
          field: 'customerName',
        },
        {
          label: 'Gender',
          field: 'gender',
        },
        {
          label: 'Address',
          field: 'address',
        },
        {
          label: 'City',
          field: 'city',
        },
        {
          label: 'State',
          field: 'state',
        },
        {
          label: 'Pin Code',
          field: 'pincode'
        },
        {
          label: 'Contact No.',
          field: 'contact'
        },
        {
          label: 'Email Id',
          field: 'emailId'
        },
        {
          label: 'GST No.',
          field: 'gstNumber'
        },

        {
          label: 'option',
          field: 'last'
        },

      ],
    }
  },
  mounted(){
    getCustomers()
      .then(data => this.customers = data)
      .catch((err =>alert(err)));
    } ,
    methods: {
        onRowClick(params){
          if(!this.onModal)
            this.$router.push({name:'updateCustomer', params: {data: params.row}});
          else{
            this.$emit('customerRowClicked', params.row);
          }
            
        },
        deleteRow(event,id){
            if(confirm("Are you sure you want to delete this customer?")){
                deleteCustomer(id)
                .then(() => {
                this.$nextTick(() => {
                    getCustomers()
                    .then(data => this.customers = data)
                    .catch((err =>alert(err)));
                })
                })
                .catch((err =>alert(err)));
            }
        }
    }

}
</script>