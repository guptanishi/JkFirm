<template>

<div class="columns container is-fluid">
    <div class="column is-half "> 
        <div class="field">
            <label class="label">Product Code</label>
            <div class="control">
                <input class="input" type="text" placeholder="product code" v-model="row.productCode">
            </div>
        </div>

        <div class="field">
            <label class="label">Product Name</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Product Name" v-model="row.productName" >
            </div>
        </div>

        <div class="field">
            <label class="label">Unit</label>
            <div class="control">
                <div class="select">
                <select v-model="row.unit">
                    <option disabled value="">Select Value</option>
                    <option>KG</option>
                    <option>Per Piece</option>
                </select>
                </div>
            </div>
        </div>
         <div class="field">
            <label class="label">Quantity</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Unit" v-model="row.qtyAvailable" >
            </div>
        </div>

        <div class="field">
            <label class="label">Cost Price</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="Number" placeholder="Cost Price" v-model="row.costPrice">
            </div>
        </div>

        <div class="field">
            <label class="label">Selling Price</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="Number" placeholder="Selling Price" v-model="row.price">
            </div>
        </div>
        <div class="field">
            <label class="label">GST %</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="text" v-model="row.vat">
            </div>
        </div>

        <div class="field">
            <label class="label">HSN Number</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="text" v-model="row.HSN">
            </div>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <button class="button is-link" v-on:click="update">Submit</button>
            </div>
            <div class="control">
                <button class="button is-link is-light">Cancel</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { updateProduct }  from '../repository'
export default {
  name: 'updateProduct',
  props: ['data'],
  data(){
    return {
      row:''
    }
  },
  mounted(){
      this.row = this.data;
      //console.log(this.row);
  },

  methods: {
    update(){
        let data = { productCode: this.row.productCode, productName: this.row.productName, 
            qtyAvailable: this.row.qtyAvailable, unit: this.row.unit, costPrice: this.row.costPrice, 
            price: this.row.price, vat: this.row.vat, HSN: this.row.HSN}
    updateProduct(data, this.row.id)
        .then(data => {
            this.$router.push('/');
        })
        .catch(err => alert(err.message));
    },
  },
}
</script>
<style scoped>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>