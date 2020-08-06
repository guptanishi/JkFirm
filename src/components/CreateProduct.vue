<template>
  <div class="columns container is-fluid">
    <div class="column is-half">
      <div class="field">
        <label class="label">Product Code</label>
        <div class="control">
          <input class="input" type="text" placeholder="product code" v-model="productCode" />
        </div>
      </div>

      <div class="field">
        <label class="label">Product Name</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="Product Name" v-model="productName" />
        </div>
      </div>

      <div class="field">
        <label class="label">Unit</label>
        <div class="control">
          <div class="select">
            <select v-model="unit">
              <option disabled value>Select Value</option>
              <option>KG</option>
              <option>Per Piece</option>
              <option>Bori</option>
              <option>Bundle</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">Cost Price</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="Number" placeholder="Cost Price" v-model="costPrice" />
        </div>
      </div>

      <div class="field">
        <label class="label">Selling Price</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="Number" placeholder="Selling Price" v-model="sellingPrice" />
        </div>
        <label style="color: #F00">{{ errors.sellingPrice }}</label>
      </div>

      <div class="field">
        <label class="label">Opening Stock</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="Number" placeholder="stock" v-model="quantityAvailable" />
        </div>
        <label style="color: #F00">{{ errors.quantityAvailable }}</label>
      </div>

      <div class="field">
        <label class="label">GST %</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" v-model="gst" />
        </div>
      </div>

      <div class="field">
        <label class="label">HSN Number</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" v-model="HSN" pattern="\d*" maxlength="4" />
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" v-on:click="create">Submit</button>
        </div>
        <div class="control">
          <button class="button is-link is-light">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createProduct, getLastProductCode, getProducts } from "../repository";
export default {
  name: "createProduct",
  data() {
    return {
      productCode: "",
      productName: "",
      unit: "",
      costPrice: 0.0,
      sellingPrice: 0.0,
      quantityAvailable: 0,
      gst: 0,
      HSN: "",
      products: [],
      errors: {
        sellingPrice: "",
        quantity: ""
      }
    };
  },
  mounted() {
    if (localStorage.username == "admin") {
      getLastProductCode()
        .then(data => {
          if (data.length == 0) {
            this.productCode = this.generateProductCode(0);
          } else {
            let lastnumber = data[0].productCode;
            let counter = Number(lastnumber.substring(4, lastnumber.length));
            counter++;
            this.productCode = this.generateProductCode(counter);
          }
        })
        .catch(err => alert(err.message));
    } else {
      this.$router.push({
        name: "login"
      });
    }
  },

  methods: {
    create() {
      if (this.productCode != "" && this.productName != "") {
        if (this.sellingPrice == "") {
          this.errors.sellingPrice = "Please enter selling price";
        }
        if (this.quantityAvailable == "") {
          this.errors.quantityAvailable = "Please enter quantity available";
        } else {
          getProducts()
            .then(data => {
              this.products = data;

              const found = this.products.some(
                el => el.productCode === this.productCode
              );

              if (!found) {
                let data = {
                  productCode: this.productCode,
                  productName: this.productName,
                  unit: this.unit,
                  description: this.description,
                  costPrice: this.costPrice,
                  sellingPrice: this.sellingPrice,
                  quantityAvailable: this.quantityAvailable,
                  gst: this.gst,
                  HSN: this.HSN
                };

                this.errors = {};
                createProduct(data)
                  .then(data => {
                    this.$router.push("/loadProducts");
                  })
                  .catch(err => alert(err.message));
              }
            })
            .catch(err => alert(err));
        }
      }
    },

    generateProductCode(counter) {
      const prefix = "LSF";
      let b = String(counter).padStart(4, "0");
      return prefix + "-" + b;
    }
  }
};
</script>
<style scoped>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>