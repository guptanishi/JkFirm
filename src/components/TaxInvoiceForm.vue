<template>
  <div>
    <!-- Debug info -->
    <div style="position: fixed; top: 0; right: 0; background: yellow; padding: 10px; z-index: 9999; font-size: 12px;">
      <div>Component Loaded!</div>
      <div>isLoading: {{ isLoading }}</div>
      <div>currentStep: {{ currentStep }}</div>
      <div>invoiceNumber: {{ invoiceNumber }}</div>
    </div>

    <div v-if="!isLoading">
      <!-- Modern Header -->
      <div class="page-header-invoice">
        <div class="container-modern">
          <div class="header-content">
            <div>
              <h1 class="page-title">
                <i class="fa fa-file-text-o"></i>
                Create Invoice
              </h1>
              <p class="page-subtitle">Invoice #{{ invoiceNumber }}</p>
            </div>
            <div class="header-actions">
              <button class="btn-modern btn-secondary-modern" @click="reloadPage">
                <i class="fa fa-times"></i> Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Steps -->
      <div class="container-modern">
        <div class="progress-steps">
          <div class="step" :class="{ active: currentStep >= 1, completed: currentStep > 1 }">
            <div class="step-number">1</div>
            <div class="step-label">Customer</div>
          </div>
          <div class="step-connector"></div>
          <div class="step" :class="{ active: currentStep >= 2, completed: currentStep > 2 }">
            <div class="step-number">2</div>
            <div class="step-label">Products</div>
          </div>
          <div class="step-connector"></div>
          <div class="step" :class="{ active: currentStep >= 3 }">
            <div class="step-number">3</div>
            <div class="step-label">Review</div>
          </div>
        </div>

        <div class="invoice-wizard">
          <!-- Step 1: Invoice Info & Customer -->
          <div v-show="currentStep === 1">
            <div class="card-modern">
              <div class="card-header-modern">
                <i class="fa fa-info-circle"></i>
                Invoice Information
              </div>
              <div class="card-body-modern">
                <div class="grid-modern grid-cols-3">
                  <div class="form-group-modern">
                    <label class="form-label-modern">Invoice No</label>
                    <input
                      class="form-input-modern"
                      type="text"
                      placeholder="Invoice Number"
                      v-model="invoiceNumber"
                      readonly
                    />
                  </div>
                  <div class="form-group-modern">
                    <label class="form-label-modern">Invoice Date</label>
                    <datepicker
                      v-model="invoiceDate"
                      :format="customFormatter"
                      class="form-input-modern"
                    ></datepicker>
                  </div>
                  <div class="form-group-modern">
                    <label class="form-label-modern">Salesman Name</label>
                    <input
                      class="form-input-modern"
                      type="text"
                      v-model="userName"
                      readonly
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="card-modern">
              <div class="card-header-modern">
                <i class="fa fa-user"></i>
                Customer Details
              </div>
              <div class="card-body-modern">
                <div class="grid-modern grid-cols-2">
                  <div class="form-group-modern">
                    <label class="form-label-modern">Customer ID</label>
                    <input
                      class="form-input-modern"
                      type="text"
                      v-model="customerId"
                      @click="onCustomerIdClick"
                      placeholder="Search customer..."
                    />
                    <div v-if="showCustomerModal">
                      <ModalForCustomers
                        :showCustomerModal="showCustomerModal"
                        @rowClicked="customerRowClicked"
                      />
                    </div>
                  </div>
                  <div class="form-group-modern">
                    <label class="form-label-modern">Customer Name</label>
                    <input
                      class="form-input-modern"
                      type="text"
                      v-model="customerName"
                      readonly
                    />
                  </div>
                  <div class="form-group-modern">
                    <label class="form-label-modern">State</label>
                    <input
                      class="form-input-modern"
                      type="text"
                      v-model="state"
                      readonly
                    />
                  </div>
                  <div class="form-group-modern">
                    <label class="form-label-modern">Address</label>
                    <input
                      class="form-input-modern"
                      type="text"
                      v-model="address"
                      readonly
                    />
                  </div>
                  <div class="form-group-modern">
                    <label class="form-label-modern">Contact Number</label>
                    <input
                      class="form-input-modern"
                      type="tel"
                      v-model="contact"
                      maxlength="10"
                    />
                  </div>
                  <div class="form-group-modern">
                    <label class="form-label-modern">GST Number</label>
                    <input
                      class="form-input-modern"
                      type="text"
                      v-model="gstNumber"
                    />
                  </div>
                </div>

                <div class="form-actions">
                  <button
                    class="btn-modern btn-primary-modern"
                    @click="nextStep"
                    :disabled="!customerId || !customerName"
                  >
                    Continue to Products <i class="fa fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Products -->
          <div v-show="currentStep === 2">
            <div class="card-modern">
              <div class="card-header-modern">
                <i class="fa fa-shopping-cart"></i>
                Add Products
              </div>
              <div class="card-body-modern">
                <div class="grid-modern grid-cols-4">
                  <div class="form-group-modern">
                    <label class="form-label-modern">Product Code</label>
                    <input
                      class="form-input-modern"
                      type="text"
                      v-model="productCode"
                      @click="onProductCodeClick"
                      placeholder="Search product..."
                    />
                    <div v-if="show">
                      <ModalForProducts :show="show" @rowClicked="rowClicked" @close="show = false"/>
                    </div>
                  </div>
                  <div class="form-group-modern">
                    <label class="form-label-modern">Product Name</label>
                    <input
                      class="form-input-modern"
                      type="text"
                      v-model="productName"
                      readonly
                    />
                  </div>
                  <div class="form-group-modern">
                    <label class="form-label-modern">Quantity</label>
                    <input
                      class="form-input-modern"
                      type="number"
                      v-model="quantity"
                      placeholder="0"
                    />
                  </div>
                  <div class="form-group-modern">
                    <label class="form-label-modern">Price (₹)</label>
                    <div class="input-with-prefix">
                      <span class="input-prefix">₹</span>
                      <input
                        type="number"
                        v-model="price"
                        class="form-input-modern input-with-prefix-input"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                <div class="grid-modern grid-cols-3" style="margin-top: 1rem">
                  <div class="form-group-modern">
                    <label class="form-label-modern">Unit</label>
                    <select v-model="unit" class="form-select-modern" disabled>
                      <option value="">Select Unit</option>
                      <option>KG</option>
                      <option>Per Piece</option>
                      <option>Bori</option>
                      <option>Bundle</option>
                    </select>
                  </div>
                  <div class="form-group-modern">
                    <label class="form-label-modern">GST (%)</label>
                    <input
                      class="form-input-modern"
                      type="number"
                      v-model="vat"
                      readonly
                    />
                  </div>
                  <div class="form-group-modern">
                    <label class="form-label-modern">HSN Code</label>
                    <input
                      class="form-input-modern"
                      type="text"
                      v-model="HSN"
                      readonly
                    />
                  </div>
                </div>

                <!-- Amount Display -->
                <div
                  style="background: #f9fafb; padding: 1rem; border-radius: 8px; margin: 1rem 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                  <div>
                    <small style="color: #6b7280;">Amount:</small>
                    <div style="font-weight: 600; font-size: 1.125rem; color: #111827;">₹{{ calculateAmount }}</div>
                  </div>
                  <div>
                    <small style="color: #6b7280;">GST ({{ vat }}%):</small>
                    <div style="font-weight: 600; font-size: 1.125rem; color: #111827;">
                      ₹{{ (calculateAmount * vat / 100).toFixed(2) }}
                    </div>
                  </div>
                  <div>
                    <small style="color: #6b7280;">Total:</small>
                    <div style="font-weight: 600; font-size: 1.125rem; color: #3b82f6;">₹{{ calculateTotal }}</div>
                  </div>
                </div>

                <div style="margin-bottom: 1rem;">
                  <label class="radio" style="margin-right: 1rem;">
                    <input type="radio" name="tax" v-model="taxType" value="1"/>
                    Including Tax
                  </label>
                  <label class="radio">
                    <input type="radio" name="tax" v-model="taxType" value="0"/>
                    Excluding Tax
                  </label>
                </div>

                <button class="btn-modern btn-success-modern" @click="addProducts">
                  <i class="fa fa-plus"></i> {{ operation === 'Add' ? 'Add Product' : 'Update Product' }}
                </button>
                <button v-if="operation === 'Update'" class="btn-modern btn-secondary-modern" @click="resetproduct"
                        style="margin-left: 0.5rem;">
                  <i class="fa fa-times"></i> Cancel
                </button>

                <!-- Products Table -->
                <div v-if="products.length > 0" style="margin-top: 2rem;">
                  <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1rem;">
                    Added Products ({{ products.length }})
                  </h3>
                  <vue-good-table :columns="productColumns" :rows="products">
                    <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'last'">
                      <button
                        style="margin-left: 10px; background: none; border: none; padding: 0.5rem; cursor: pointer; color: #ef4444;"
                        @click.stop="deleteRow(props.row)"
                      >
                        <i class="fa fa-trash-o"></i>
                      </button>
                      <button
                        style="background: none; border: none; padding: 0.5rem; cursor: pointer; color: #3b82f6;"
                        @click.stop="edit(props.row)"
                      >
                        <i class="fa fa-pencil"></i>
                      </button>
                    </span>
                      <span v-else>{{ props.formattedRow[props.column.field] }}</span>
                    </template>
                  </vue-good-table>
                </div>

                <div class="form-actions">
                  <button class="btn-modern btn-secondary-modern" @click="prevStep">
                    <i class="fa fa-arrow-left"></i> Back
                  </button>
                  <button
                    class="btn-modern btn-primary-modern"
                    @click="nextStep"
                    :disabled="products.length === 0"
                  >
                    Continue to Review <i class="fa fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Review & Summary -->
          <div v-show="currentStep === 3">
            <div class="card-modern">
              <div class="card-header-modern">
                <i class="fa fa-check-circle"></i>
                Review & Generate Invoice
              </div>
              <div class="card-body-modern">
                <div class="summary-grid">
                  <!-- Left: Customer & Products -->
                  <div class="summary-column">
                    <h3 class="summary-section-title">Customer Details</h3>
                    <div class="info-display">
                      <div class="info-row">
                        <span class="info-label">Customer:</span>
                        <span class="info-value">{{ customerName }}</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">Customer ID:</span>
                        <span class="info-value">{{ customerId }}</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">GST No:</span>
                        <span class="info-value">{{ gstNumber }}</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">State:</span>
                        <span class="info-value">{{ state }}</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">Contact:</span>
                        <span class="info-value">{{ contact }}</span>
                      </div>
                    </div>

                    <h3 class="summary-section-title">Products ({{ products.length }})</h3>
                    <div class="products-summary">
                      <div v-for="(product, index) in products" :key="index" class="product-summary-item">
                        <div class="product-name">{{ product.productName }}</div>
                        <div class="product-details">
                          {{ product.quantity }} {{ product.unit }} × ₹{{ product.price }} (GST: {{ product.vat }}%)
                          <span class="product-total">= ₹{{ product.total }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Right: Payment Summary -->
                  <div class="summary-column totals-column">
                    <h3 class="summary-section-title">Payment Summary</h3>
                    <div class="totals-display">
                      <div class="info-row">
                        <span class="info-label">Invoice Number:</span>
                        <span class="info-value">{{ invoiceNumber }}</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">Invoice Date:</span>
                        <span class="info-value">{{ customFormatter(invoiceDate) }}</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">Salesman:</span>
                        <span class="info-value">{{ userName }}</span>
                      </div>
                      <div class="total-row grand-total">
                        <span>Grand Total:</span>
                        <span>₹{{ calculateGrandTotal }}</span>
                      </div>

                      <!-- Payment Input -->
                      <div class="form-group-modern" style="margin-top: 1rem;">
                        <label class="form-label-modern">Advance Payment</label>
                        <div class="input-with-prefix">
                          <span class="input-prefix">₹</span>
                          <input
                            type="number"
                            v-model="payment"
                            class="form-input-modern input-with-prefix-input"
                            placeholder="0.00"
                          />
                        </div>
                      </div>

                      <div class="form-group-modern">
                        <label class="form-label-modern">Payment Mode</label>
                        <select v-model="mode" class="form-select-modern">
                          <option value="">Select Mode</option>
                          <option value="Cash">Cash</option>
                          <option value="Card">Card</option>
                          <option value="UPI">UPI</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="Cheque">Cheque</option>
                        </select>
                      </div>

                      <div class="form-group-modern">
                        <label class="form-label-modern">Payment Date</label>
                        <datepicker
                          v-model="paymentDate"
                          :format="customFormatter"
                          class="form-input-modern"
                        ></datepicker>
                      </div>

                      <div class="total-row payment-due">
                        <span>Payment Due:</span>
                        <span>₹{{ calculatePaymentDue }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="form-actions">
                  <button class="btn-modern btn-secondary-modern" @click="prevStep">
                    <i class="fa fa-arrow-left"></i> Back
                  </button>
                  <button class="btn-modern btn-success-modern" @click="saveInvoice">
                    <i class="fa fa-save"></i> Save Invoice
                  </button>
                  <button
                    class="btn-modern btn-primary-modern"
                    :disabled="!isInvoiceSaved"
                    @click="generatePdf('')"
                  >
                    <i class="fa fa-file-pdf-o"></i> Generate PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loader" id="loader-1" v-else></div>

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
import {EventBus} from "../../event-bus.js";

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
  props: ["data", "action"],

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
      serverParams: {
        page: 1, // what page I want to show
        perPage: 10, // how many items I'm showing per page
      },
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
      isInvoiceSaved: false,
      componentName: "",
      invoiceType: "",
      rowData: {},
      operation: "Add",
      paymentOperation: "Add",
      invoiceList: [],
      HSN: "",
      id: "",
      invoiceEditMode: false,
      isLoading: false,
      currentStep: 1,
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
    console.log("TaxInvoiceForm mounted");
    console.log("localStorage.username:", localStorage.username);
    console.log("Initial isLoading:", this.isLoading);

    EventBus.$on("hideContent", () => {
      document.getElementById("content").style.display = "none";
    });

    if (localStorage.username) {
      this.isLoading = true;
      this.rowData = this.data;
      if (this.rowData === undefined) {
        // Set timeout fallback in case API fails
        const timeoutId = setTimeout(() => {
          console.warn("API timeout, using fallback");
          this.invoiceNumber = this.generateInvoiceNumber(1);
          this.isLoading = false;
        }, 5000);

        getLastInvoiceNumber()
          .then((data) => {
            clearTimeout(timeoutId);
            if (data.length == 0) {
              const isAprilFirst =
                state.date.getDate() === 1 && state.date.getMonth() === 3;
              if (isAprilFirst) {
                this.invoiceNumber = this.generateInvoiceNumber1(1);
              } else {
                this.invoiceNumber = this.generateInvoiceNumber(1);
              }
            } else {
              let lastnumber = data[0].invoiceNumber;
              let dashIndex = lastnumber.lastIndexOf('-');
              let prefix = lastnumber.substring(0, dashIndex);
              let counter = Number(lastnumber.substring(dashIndex + 1));
              counter++;
              let nextCounter = String(counter).padStart(3, "0");
              this.invoiceNumber = prefix + "-" + nextCounter;
            }
            this.isLoading = false;
          })
          .catch((err) => {
            clearTimeout(timeoutId);
            console.error("Error fetching invoice number:", err);
            this.invoiceNumber = this.generateInvoiceNumber(1);
            this.isLoading = false;
          });
        this.invoiceDate = state.date;
        this.paymentDate = state.date;
      } else {
        this.isLoading = false;
        this.invoiceEditMode = true;
        this.invoiceNumber = this.rowData.invoiceNumber;
        this.invoiceDate = this.rowData.invoiceDate;
        this.products = this.rowData.products;
        this.del = this.rowData.delMode;
        this.grandTotal = this.rowData.totalAmount;
        this.payment = this.rowData.payment;
        this.paymentDate = this.customFormatter(this.rowData.paymentDate);
        this.id = this.rowData.id;

        // Prefill customer form fields so they appear in the form
        this.customerId = this.rowData.customerId;
        this.customerName = this.rowData.customerName;
        this.state = this.rowData.state;
        this.address = this.rowData.address;
        this.contact = this.rowData.contact;
        this.gstNumber = this.rowData.gstNumber;
        this.mode = this.rowData.paymentMode;

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
      if (this.action == "download") {
        this.generatePdf("Triplicate");
        this.$nextTick(() => {
          this.$router.push({
            name: "taxInvoiceList",
          });
        });
      }
    } else {
      this.$router.push({
        name: "login",
      });
    }
  },
  methods: {
    nextStep() {
      if (this.currentStep < 3) {
        // If moving from step 2 to step 3, ensure customer details are added
        if (this.currentStep === 2) {
          this.addCustomerDetail();
        }
        this.currentStep++;
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    },
    generateInvoiceNumber(counter) {
      const prefix = "JK";

      let fullYear = state.date.getFullYear().toString().substring(2);
      let nextYear = (state.date.getFullYear() + 1).toString().substring(2);

      let b = String(counter).padStart(3, "0");
      return prefix + fullYear + nextYear + "-" + b;
    },
    generateInvoiceNumber1(counter) {
      const prefix = "JK";

      let fullYear = state.date.getFullYear().toString().substring(2);
      

      let b = String(counter).padStart(3, "0");
      return prefix + fullYear  + "-" + b;
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
      this.HSN = data.HSN;
    },
    addProducts() {
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
          id: this.productId,
          HSN: this.HSN,
        };
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
      this.resetproduct();
    },

    updatePr(rowData) {
      // Stock update removed - not needed anymore
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
      this.address = `${data.address}, ${data.city}`;
      this.contact = data.contact;
      this.gstNumber = data.gstNumber;
      this.del = this.state.startsWith("M.") ? "outside state" : "within state";
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
          getInvoices(this.serverParams)
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

                updateInvoice(invoiceData, this.id).then((data) => {
                  // this.invoiceData = invoiceData;
                  alert("Invoice is successfully updated");
                  this.$nextTick(() => {
                    this.products.forEach((element) => {
                      this.updatePr(element);
                    });
                  });
                });
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
      this.products = this.products.filter(
        (el) => el.productCode !== row.productCode
      );
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
:root {
  /* Success Colors */
  --success-500: #10b981;
  --success-600: #059669;
  --success-700: #047857;
  --success-800: #065f46;

  /* Warning Colors */
  --warning-500: #f59e0b;
  --warning-600: #d97706;
  --warning-700: #b45309;
  --warning-800: #92400e;

  /* Error/Danger Colors */
  --error-500: #ef4444;
  --error-600: #dc2626;
  --error-700: #b91c1c;
  --error-800: #991b1b;
}

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

.loader {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  position: relative;
  margin: 0 auto;
  top: 100px;
  border: 10px solid transparent;
  border-top-color: #3498db;
  border-bottom-color: #ccc;
}

@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

/* Modern Invoice Wizard Styles */
.page-header-invoice {
  background: white;
  border-bottom: 1px solid var(--gray-200);
  padding: 1.5rem 0;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.invoice-wizard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
}

/* Progress Steps */
.progress-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background: white;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.step-number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--gray-200);
  color: var(--gray-600);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  transition: all 0.3s;
  border: 3px solid transparent;
}

.step.active .step-number {
  background: var(--primary-500);
  color: white;
  border-color: var(--primary-300);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}

.step.completed .step-number {
  background: var(--success-500);
  color: white;
}

.step-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gray-600);
}

.step.active .step-label {
  color: var(--primary-700);
}

.step-connector {
  width: 80px;
  height: 2px;
  background: var(--gray-300);
  margin: 0 1rem;
}

.step.completed + .step-connector {
  background: var(--success-500);
}

/* Summary Grid */
.summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.summary-column {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--gray-200);
}

.totals-column {
  background: rgba(59, 130, 246, 0.05);
  border-color: rgba(59, 130, 246, 0.2);
}

.summary-section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--primary-500);
}

.info-display {
  margin-bottom: 2rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--gray-200);
}

.info-label {
  font-weight: 600;
  color: var(--gray-600);
}

.info-value {
  font-weight: 600;
  color: var(--gray-900);
}

/* Products Summary */
.products-summary {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.product-summary-item {
  background: var(--gray-50);
  padding: 1rem;
  border-radius: 8px;
  border-left: 3px solid var(--primary-500);
}

.product-name {
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 0.25rem;
}

.product-details {
  font-size: 0.875rem;
  color: var(--gray-600);
  display: flex;
  justify-content: space-between;
}

.product-total {
  font-weight: 600;
  color: var(--primary-600);
}

/* Totals Display */
.totals-display {
  padding: 1rem;
}

.total-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  font-size: 1rem;
  color: var(--gray-700);
}

.total-row.grand-total {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-700);
  padding-top: 1rem;
  margin-top: 1rem;
  border-top: 2px solid rgba(59, 130, 246, 0.3);
}

.total-row.payment-due {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--success-600);
  padding-top: 1rem;
  margin-top: 1rem;
  border-top: 1px solid rgba(59, 130, 246, 0.2);
}

/* Responsive */
@media (max-width: 968px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }

  .progress-steps {
    padding: 1.5rem 1rem;
  }

  .step-connector {
    width: 40px;
  }

  .invoice-wizard {
    padding: 0 0.5rem 2rem;
  }
}
</style>
