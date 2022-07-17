<template>
  <div class="columns container is-fluid">
    <div class="column is-half">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Invoice Info</p>
          <a href="#" class="card-header-icon" aria-label="more options">
            <span class="icon">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="field">
              <label class="label">Invoice No:</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="invoiceNumber"
                  v-model="invoiceNumber"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Invoice Date:</label>
              <div class="control has-icons-left has-icons-right">
                <datepicker
                  v-model="invoiceDate"
                  :format="customFormatter"
                  class="inputType"
                ></datepicker>
              </div>
            </div>
            <div class="field">
              <label class="label">Salesman Name</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="text"
                  placeholder="userName"
                  v-model="userName"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Product Details</p>
          <a href="#" class="card-header-icon" aria-label="more options">
            <span class="icon">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="field">
              <label class="label">Product Code</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="productCode"
                  v-model="productCode"
                  @click="onProductCodeClick"
                />
              </div>
              <div v-if="show">
                <ModalForProducts :show="show" @rowClicked="rowClicked" />
              </div>
            </div>
            <div class="field">
              <label class="label">Product Name</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="text"
                  placeholder="productName"
                  v-model="productName"
                  disabled
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Price</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="number"
                  placeholder="price"
                  v-model="price"
                  disabled
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Quantity</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="number"
                  placeholder="quantity"
                  v-model="quantity"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Unit</label>
              <div class="control">
                <div class="select">
                  <select v-model="unit" disabled>
                    <option disabled value>Select Value</option>
                    <option>KG</option>
                    <option>Per Piece</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label">Amount</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="number"
                  placeholder="amount"
                  v-model="calculateAmount"
                  disabled
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Gst</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="number"
                  placeholder="GST"
                  v-model="vat"
                  disabled
                />%
              </div>
            </div>
            <div class="field">
              <label class="label">TotalAmount</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="number"
                  placeholder="Total"
                  v-model="calculateTotal"
                  disabled
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <label class="radio">
                  <input type="radio" name="tax" v-model="taxType" value="1" />
                  Including Tax
                </label>
                <label class="radio">
                  <input type="radio" name="tax" v-model="taxType" value="0" />
                  Non-including Tax
                </label>
              </div>
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <a @click="addProducts" class="card-footer-item">{{ operation }}</a>
          <!-- <a @click="updatePr" class="card-footer-item">Update</a> -->
          <a @click="resetproduct" class="card-footer-item">Reset</a>
        </footer>
      </div>
      <div class="card">
        <div class="card-content">
          <div class="content">
            <vue-good-table :columns="productColumns" :rows="products">
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'last'">
                  <button
                    style="margin-left: 10px"
                    @click.stop="deleteRow(props.row)"
                  >
                    <i class="fa fa-trash-o"></i>
                  </button>
                  <button @click.stop="edit(props.row)">
                    <i class="fa fa-pencil"></i>
                  </button>
                </span>
                <span v-else>{{ props.formattedRow[props.column.field] }}</span>
              </template>
            </vue-good-table>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-half">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Customer Details</p>
          <a href="#" class="card-header-icon" aria-label="more options">
            <span class="icon">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="field">
              <label class="label">Customer Id</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="customerId"
                  @click="onCustomerIdClick"
                />
                <div v-if="showCustomerModal">
                  <ModalForCustomers
                    :showCustomerModal="showCustomerModal"
                    @rowClicked="customerRowClicked"
                  />
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label">Customer Name</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="text"
                  v-model="customerName"
                  disabled
                />
              </div>
            </div>
            <div class="field">
              <label class="label">State</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="text" v-model="state" disabled />
              </div>
            </div>
            <div class="field">
              <label class="label">Address</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="text" v-model="address" disabled />
              </div>
            </div>
            <div class="field">
              <label class="label">Contact No.</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="number"
                  v-model="contact"
                  maxlength="10"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Customer Gst No.</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="text" v-model="gstNumber" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Payment Info</p>
          <a href="#" class="card-header-icon" aria-label="more options">
            <span class="icon">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="field">
              <label class="label">Delievery</label>
              <div class="control">
                <div class="select">
                  <select v-model="del">
                    <option disabled value>Select Value</option>
                    <option>within state</option>
                    <option>outside state</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label">Payment Mode</label>
              <div class="control">
                <div class="select">
                  <select v-model="mode">
                    <option disabled value>Select Value</option>
                    <option>Cheque</option>
                    <option>Cash</option>
                    <option>Cash Memo</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label">Payment</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="number" v-model="payment" />
              </div>
            </div>
            <div class="field">
              <label class="label">Payment Date</label>
              <div class="control has-icons-left has-icons-right">
                <datepicker
                  v-model="paymentDate"
                  :format="customFormatter"
                  class="inputType"
                ></datepicker>
              </div>
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <a @click="addCustomerDetail" class="card-footer-item">{{
            paymentOperation
          }}</a>
          <a @click="resetPaymentDetails" class="card-footer-item">Reset</a>
        </footer>
      </div>

      <div class="card">
        <div class="card-content">
          <div class="content">
            <vue-good-table :columns="paymentColumns" :rows="customerDetails">
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'last'">
                  <button
                    style="margin-left: 10px"
                    @click.stop="deletePaymentRow(props.row.id)"
                  >
                    <i class="fa fa-trash-o"></i>
                  </button>
                  <button @click.stop="editPaymentRow(props.row)">
                    <i class="fa fa-pencil"></i>
                  </button>
                </span>
                <span v-else>{{ props.formattedRow[props.column.field] }}</span>
              </template>
            </vue-good-table>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-content">
          <div class="content">
            <div class="field">
              <label class="label">Grand Total</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="text"
                  v-model="calculateGrandTotal"
                  disabled
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Total Payment</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="number" v-model="payment" disabled />
              </div>
            </div>
            <div class="field">
              <label class="label">Payment Due</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="number"
                  v-model="calculatePaymentDue"
                  disabled
                />
              </div>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button btn-primary" @click="saveInvoice">
                Save
              </button>
            </div>
            <div class="control">
              <button class="button btn-primary" @click="reloadPage">
                Cancel
              </button>
            </div>
            <div class="control">
              <button
                class="button btn-secondary"
                :disabled="!this.isInvoiceSaved"
                @click="generatePdf('')"
              >
                First Copy
              </button>
            </div>
            <div class="control">
              <button
                class="button btn-secondary"
                :disabled="!this.isInvoiceSaved"
                @click="generatePdf('Duplicate')"
              >
                Duplicate
              </button>
            </div>
            <div class="control">
              <button
                class="button btn-secondary"
                :disabled="!this.isInvoiceSaved"
                @click="generatePdf('Triplicate')"
              >
                Triplicate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <component
      v-bind:is="componentName"
      :info="invoiceData"
      :invoiceType="invoiceType"
    ></component>
  </div>
</template>

<script>
import {
  updateProduct,
  createInvoice,
  getLastInvoiceNumber,
  getInvoices,
  createCashInvoice,
  getLastCashMemoInvoiceNumber,
  updateInvoice,
} from "../repository";
import Datepicker from "vuejs-datepicker";
import moment from "moment";
import ModalForProducts from "./ModalForProducts.vue";
import ModalForCustomers from "./ModalForCustomers.vue";
import PdfGenerator from "./PdfGenerator.vue";
import { EventBus } from "../../event-bus.js";

var state = {
  date: new Date(),
};

export default {
  name: "taxInvoiceForm",
  components: {
    Datepicker,
    ModalForProducts,
    ModalForCustomers,
    PdfGenerator,
  },
  props: ["data"],

  data() {
    return {
      customerDetails: [],
      paymentColumns: [
        {
          label: "Customer Name",
          field: "customerName",
        },
        {
          label: "State",
          field: "state",
        },
        {
          label: "Payment Mode",
          field: "mode",
        },
        {
          label: "Payment",
          field: "payment",
        },
        {
          label: "Payment Date",
          field: "paymentDate",
        },
        {
          label: "Options",
          field: "last",
        },
      ],
      productColumns: [
        {
          label: "PR Code",
          field: "productCode",
        },
        {
          label: "PR Name",
          field: "productName",
        },
        {
          label: "Price",
          field: "price",
        },
        {
          label: "Quantity",
          field: "quantity",
        },
        {
          label: "Vat",
          field: "vat",
        },
        {
          label: "HSN",
          field: "HSN",
        },
        {
          label: "Total",
          field: "total",
        },
        {
          label: "Options",
          field: "last",
        },
      ],
      products: [],
      productId: "",
      productCode: "",
      productName: "",
      price: "",
      quantity: "",
      unit: "",
      amount: 0,
      vat: "",
      taxType: "1",
      invoiceNumber: "",
      invoiceDate: "",
      userName: "Mahesh Gupta",
      customerId: "",
      customerName: "",
      state: "",
      address: "",
      contact: "",
      show: false,
      gstNumber: "",
      total: 0,
      showCustomerModal: false,
      mode: "",
      payment: 0,
      paymentDate: "",
      grandTotal: 0,
      paymentDue: 0,
      del: "within state",
      invoiceData: {},
      customerDetails: [],
      isInvoiceSaved: false,
      componentName: "",
      invoiceType: "",
      rowData: {},
      operation: "Add",
      paymentOperation: "Add",
      stockAvailable: "",
      invoiceList: [],
      HSN: "",
      id: "",
      invoiceEditMode: false,
    };
  },
  computed: {
    calculateAmount() {
      return this.price * this.quantity;
    },
    calculateTotal() {
      let amount = this.calculateAmount;

      let aa = (amount * this.vat) / 100;

      if (this.taxType == "1") {
        return (this.total = amount + aa);
      } else {
        return (this.total = amount);
      }
    },
    calculateGrandTotal() {
      return (this.grandTotal = this.products.reduce(
        (accum, item) => accum + item.total,
        0
      ));
    },
    calculatePaymentDue() {
      return (this.paymentDue = this.grandTotal - this.payment);
    },
  },
  mounted() {
    EventBus.$on("hideContent", () => {
      document.getElementById("content").style.display = "none";
    });

    if (localStorage.username == "admin") {
      this.rowData = this.data;
      if (this.rowData == undefined) {
        
        getLastInvoiceNumber()
          .then((data) => {
            if (data.length == 0) {
              this.invoiceNumber = this.generateInvoiceNumber(5);
            }else {
              let lastnumber = data[0].invoiceNumber;
              let counter = Number(lastnumber.substring(7, lastnumber.length));
              counter++;
              this.invoiceNumber = this.generateInvoiceNumber(counter);
            }
          })
          .catch((err) => alert("can not fetch invoice number"));
        this.invoiceDate = state.date;
        this.paymentDate = state.date;
      } else {
        
        this.invoiceEditMode = true;
        this.invoiceNumber = this.rowData.invoiceNumber;
        this.invoiceDate = this.rowData.invoiceDate;
        this.products = this.rowData.products;
        this.del = this.rowData.delMode;
        this.grandTotal = this.rowData.totalAmount;
        this.payment = this.rowData.payment;
        this.paymentDate = this.customFormatter(this.rowData.paymentDate);
        this.id = this.rowData.id;

        let data = {
          customerId: this.rowData.customerId,
          customerName: this.rowData.customerName,
          state: this.rowData.state,
          address: this.rowData.address,
          contact: this.rowData.contact,
          gstNumber: this.rowData.gstNumber,
          mode: this.rowData.paymentMode,
          payment: this.rowData.payment,
          paymentDate: this.customFormatter(this.paymentDate),
        };

        this.customerDetails.push(data);

        this.invoiceData = {
          invoiceNumber: this.invoiceNumber,
          invoiceDate: this.invoiceDate,
          delMode: this.del,
          username: this.username,
          products: this.products,
          customer: this.customerDetails[0],
          paymentMode: this.mode,
          totalAmount: this.grandTotal,
          payment: this.payment,
          paymentDate: this.customFormatter(this.paymentDate),
        };
        console.log(this.rowData.id);
        this.isInvoiceSaved = true;
      }
    } else {
      this.$router.push({
        name: "login",
      });
    }
  },
  methods: {
    generateInvoiceNumber(counter) {
      const prefix = "JK";
      let fullYear = state.date.getFullYear();
      let b = String(counter).padStart(2, "0");
      return prefix + "-" + fullYear + b;
    },

    generateCashMemoInvoiceNumber(counter) {
      const prefix = "PB";
      let b = String(counter).padStart(2, "0");
      return prefix + "-" + b;
    },
    customFormatter(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    onProductCodeClick() {
      this.show = !this.show;
    },
    rowClicked(data) {
      this.show = !this.show;
      this.productCode = data.productCode;
      this.productName = data.productName;
      this.price = data.price;
      this.unit = data.unit;
      this.amount = data.price;
      this.vat = data.vat;
      this.productId = data.id;
      this.stockAvailable = data.qtyAvailable;
      this.HSN = data.HSN;

      //alert(this.productId);
    },
    addProducts() {
      debugger;
      if (this.productCode != "" && this.productCode != undefined) {
        const found = this.products.some(
          (el) => el.productCode === this.productCode
        );
        let data = {
          productCode: this.productCode,
          productName: this.productName,
          price: this.price,
          vat: this.vat,
          quantity: this.quantity,
          unit: this.unit,
          total: this.total,
          stockAvailable: this.stockAvailable,
          id: this.productId,
          HSN: this.HSN,
        };
        if (parseInt(this.quantity) > parseInt(this.stockAvailable)) {
          alert("stock is not available!");
        } else {
          if (!found) {
            this.products.push(data);
          } else {
            this.products = this.products.filter(
              (el) => el.productCode != this.productCode
            );
            this.products.push(data);
            this.operation = "Add";
          }
        }
      }
      this.resetproduct();
    },

    updatePr(rowData) {
      let data = {
        qtyAvailable: rowData.stockAvailable - rowData.quantity,
      };
      updateProduct(data, rowData.id)
        .then((data) => {
          alert("stock updated");
        })
        .catch((err) => alert("product not updated"));
    },
    resetproduct() {
      this.productCode = "";
      this.productName = "";
      this.price = "";
      this.vat = "";
      this.quantity = 0;
      this.unit = "";
      this.total = 0;
    },

    resetPaymentDetails() {
      this.delMode = "within india";
      this.mode = "";
      this.payment = 0;
      this.paymentDate = this.customFormatter(state.date);
    },
    onCustomerIdClick() {
      this.showCustomerModal = !this.showCustomerModal;
    },
    customerRowClicked(data) {
      this.showCustomerModal = !this.showCustomerModal;
      this.customerId = data.customerId;
      this.customerName = data.customerName;
      this.state = data.state;
      this.address = data.address;
      this.contact = data.contact;
      this.gstNumber = data.gstNumber;
    },
    addCustomerDetail() {
      if (this.customerId !== undefined && this.customerId != "") {
        const found = this.customerDetails.some(
          (el) => el.customerId === this.customerId
        );
        let data = {
          customerId: this.customerId,
          customerName: this.customerName,
          state: this.state,
          address: this.address,
          contact: this.contact,
          gstNumber: this.gstNumber,
          mode: this.mode,
          payment: this.payment,
          paymentDate: this.customFormatter(this.paymentDate),
        };
        if (!found) {
          this.customerDetails.push(data);
        } else {
          this.customerDetails = this.customerDetails.filter(
            (el) => el.customerId != this.customerId
          );
          this.customerDetails.push(data);
        }
      }
      this.paymentOperation = "Add";
    },
    saveInvoice() {
      if (
        (this.invoiceNumber != "" &&
          this.products.length != 0 &&
          this.customerId != "") ||
        this.invoiceEditMode
      ) {
        if (this.mode != "Cash Memo") {
          getInvoices()
            .then((data) => {
              this.invoiceList = data;
              const found = this.invoiceList.some(
                (el) => el.invoiceNumber === this.invoiceNumber
              );

              let invoiceData = {
                invoiceNumber: this.invoiceNumber,
                invoiceDate: this.invoiceDate,
                delMode: this.del,
                username: this.username,
                products: this.products,
                customer: this.customerDetails[0],
                paymentMode: this.mode,
                totalAmount: this.grandTotal,
                payment: this.payment,
                paymentDate: this.customFormatter(this.paymentDate),
              };

              if (!found) {
                createInvoice(invoiceData)
                  .then((data) => {
                    alert("Invoice is successfully created");
                    this.invoiceData = invoiceData;
                    this.$nextTick(() => {
                      this.isInvoiceSaved = true;
                      this.products.forEach((element) => {
                        this.updatePr(element);
                      });
                    });
                  })
                  .catch((err) => alert("invoice not saved successfully"));
              } else {
                console.log(this.rowData);

                updateInvoice(invoiceData, this.id).then(
                  (data) => {
                    // this.invoiceData = invoiceData;
                    alert("Invoice is successfully updated");
                    this.$nextTick(() => {
                      this.products.forEach((element) => {
                        this.updatePr(element);
                      });
                    });
                  }
                );
              }
            })
            .catch((err) => alert("Invoice not saved"));
        } else {
          let memoNumber = "";
          getLastCashMemoInvoiceNumber()
            .then((data) => {
              if (data.length == 0) {
                memoNumber = this.generateCashMemoInvoiceNumber(1);
              } else {
                let lastnumber = data[0].invoiceNumber;
                let counter = Number(
                  lastnumber.substring(3, lastnumber.length)
                );
                counter++;
                memoNumber = this.generateCashMemoInvoiceNumber(counter);
              }

              let invoiceData = {
                invoiceNumber: memoNumber,
                invoiceDate: this.invoiceDate,
                delMode: this.del,
                username: this.username,
                products: this.products,
                customer: this.customerDetails[0],
                paymentMode: this.mode,
                totalAmount: this.grandTotal,
                payment: this.payment,
                paymentDate: this.customFormatter(this.paymentDate),
              };

              createCashInvoice(invoiceData)
                .then((data) => {
                  alert("casMemo is successfully created");
                  this.invoiceData = invoiceData;
                  this.$nextTick(() => {
                    this.isInvoiceSaved = true;
                    this.products.forEach((element) => {
                      this.updatePr(element);
                    });
                  });
                })
                .catch((err) => alert("casMemo is not saved"));
            })
            .catch((err) => alert("can not fetch cash memo"));
        }
      }
    },
    getList() {
      this.$router.push("/getCustomers");
    },
    generatePdf(type) {
      this.componentName = "PdfGenerator";
      this.invoiceType = type;
      EventBus.$emit("showContent");
    },
    deleteRow(row) {
      console.log(row);
      this.products = this.products.filter(
        (el) => el.productCode !== row.productCode
      );
      console.log(this.products);
    },
    edit(row) {
      this.operation = "Update";
      this.productCode = row.productCode;
      this.productName = row.productName;
      this.price = row.price;
      this.vat = row.vat;
      this.quantity = row.quantity;
      this.unit = row.unit;
    },
    deletePaymentRow(id) {
      this.customerDetails = this.customerDetails.filter((el) => el._id != id);
    },
    editPaymentRow(row) {
      this.paymentOperation = "update";
      this.customerId = row.customerId;
      this.customerName = row.customerName;
      this.state = row.state;
      this.address = row.address;
      this.contact = row.contact;
      this.gstNumber = row.gstNumber;
      this.delMode = row.delMode;
      this.mode = row.mode;
      this.paymentDate = state.date;
      this.payment = row.payment;
    },
    reloadPage() {
      this.$router.go(0);
    },
  },
};
</script>
<style scoped>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

.inputType {
  background-color: white;
  border-color: #dbdbdb;
  color: #363636;
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
  max-width: 100%;
  width: 100%;
}
.fa-angle-down {
  display: none;
}
</style>