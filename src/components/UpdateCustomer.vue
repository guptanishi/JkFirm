<template>
  <div class="columns container is-fluid">
    <div class="column is-half">
      <div class="field">
        <label class="label">Customer Id</label>
        <div class="control">
          <input class="input" type="text" placeholder="customer id" v-model="row.customerId" />
        </div>
      </div>

      <div class="field">
        <label class="label">Customer Name</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="customerName" v-model="row.customerName" />
        </div>
      </div>

      <div class="field">
        <label class="label">Gender</label>
        <div class="control">
          <label class="radio">
            <input type="radio" name="gender" v-model="row.gender" value="male" /> Male
          </label>
          <label class="radio">
            <input type="radio" name="gender" v-model="row.gender" value="female" /> Female
          </label>
        </div>
      </div>
      <div class="field">
        <label class="label">Address</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="Address" v-model="row.address" />
        </div>
      </div>

      <div class="field">
        <label class="label">City</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="city" v-model="row.city" />
        </div>
      </div>

      <div class="field">
        <label class="label">State</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" v-model="row.state" />
        </div>
      </div>

      <div class="field">
        <label class="label">Pincode</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" v-model="row.pincode" maxlength="6" pattern="\d*" />
        </div>
      </div>

      <div class="field">
        <label class="label">Contact Number</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" v-model="row.contact" pattern="\d*" maxlength="10" />
        </div>
      </div>
      <div class="field">
        <label class="label">EmailId</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="email" v-model="row.emailId" />
        </div>
      </div>

      <div class="field">
        <label class="label">GST no.</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" v-model="row.gstNumber" required />
        </div>
        <label v-if="errors.length" style="color: #F00">{{errors[0]}}</label>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" v-on:click="update">Update</button>
        </div>
        <div class="control">
          <button class="button is-link is-light" v-on:click="reset">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateCustomer } from "../repository";
export default {
  name: "updateCustomer",
  props: ["data"],
  data() {
    return {
      row: "",
      errors: []
    };
  },
  mounted() {
    if (localStorage.username == "admin") {
      this.row = this.data;
    } else {
      this.$router.push({
        name: "login"
      });
    }
  },
  methods: {
    update() {
      if (this.row.gstNumber == "" || this.row.gstNumber === null) {
        this.errors.push("Please enter GST No/Adhar NO");
      } else {
        let data = {
          customerId: this.row.customerId,
          customerName: this.row.customerName,
          address: this.row.address,
          city: this.row.city,
          state: this.row.state,
          pincode: this.row.pincode,
          contact: this.row.contact,
          emailId: this.row.emailId,
          gstNumber: this.row.gstNumber
        };

        updateCustomer(data, this.row.id)
          .then(data => {
            this.$router.push("/getCustomers");
          })
          .catch(err => alert(err.message));
      }
    },
    reset() {
      this.row.customerId = "";
      this.row.customerName = "";
      this.row.address = "";
      this.row.city = "";
      this.row.state = "";
      this.row.pincode = "";
      this.row.contact = "";
      this.row.emailId = "";
      this.row.gstNumber = "";
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