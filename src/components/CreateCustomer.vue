<template>
  <div class="columns container is-fluid">
    <div class="column is-half">
      <div class="field">
        <label class="label">Customer Id</label>
        <div class="control">
          <input class="input" type="text" placeholder="customer id" v-model="customerId" />
        </div>
      </div>

      <div class="field">
        <label class="label">Customer Name</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="customerName" v-model="customerName" />
        </div>
      </div>
      <div class="field">
        <label class="label">Address</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="Address" v-model="address" />
        </div>
      </div>

      <div class="field">
        <label class="label">City</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="city" v-model="city" />
        </div>
      </div>

      <div class="field">
        <label class="label">State</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" v-model="state" />
        </div>
      </div>

      <div class="field">
        <label class="label">Pincode</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" v-model="pincode" maxlength="6" pattern="\d*" />
        </div>
      </div>

      <div class="field">
        <label class="label">Contact Number</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" v-model="contact" pattern="\d*" maxlength="10" />
        </div>
      </div>
      <div class="field">
        <label class="label">EmailId</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="email" v-model="emailId" />
        </div>
      </div>

      <div class="field">
        <label class="label">GST no.</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" v-model="gstNumber" required />
        </div>
        <label v-if="errors.length" style="color: #F00">{{errors[0]}}</label>
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
import { createCustomer, getLastCustomerId, getCustomers } from "../repository";
export default {
  name: "createCustomer",
  data() {
    return {
      customerId: "",
      customerName: "",
      address: "",
      city: "",
      state: "",
      pincode: 0,
      contact: "",
      emailId: "",
      gstNumber: "",
      errors: [],
      customers: []
    };
  },
  mounted() {
    if (localStorage.username == "admin") {
      getLastCustomerId()
        .then(data => {
          if (data.length == 0) {
            this.customerId = this.generateCustomerId(0);
          } else {
            let lastnumber = data[0].customerId;
            this.customerId = this.generateCustomerId(parseInt(lastnumber));
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
      if (this.gstNumber == "") {
        this.errors.push("Please enter GST No/Adhar NO");
      } else {
        if (this.customerId != "" && this.customerName != "") {
          getCustomers().then(data => {
            this.customers = data;
            const found = this.customers.some(
              el => el.customerId === this.customerId
            );
            if (!found) {
              let data = {
                customerId: this.customerId,
                customerName: this.customerName,
                address: this.address,
                city: this.city,
                state: this.state,
                pincode: this.pincode,
                contact: this.contact,
                emailId: this.emailId,
                gstNumber: this.gstNumber
              };
              createCustomer(data)
                .then(data => {
                  this.$router.push("/getCustomers");
                })
                .catch(err => alert(err.message));
            }
          });
        }
      }
    },

    generateCustomerId(counter) {
      counter++;
      let b = String(counter).padStart(3, "0");
      return b;
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