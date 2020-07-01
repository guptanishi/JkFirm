<template>
<div class="columns container is-fluid">
    <div class="column is-half "> 
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                Invoice Info
                </p>
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
                            <input class="input" type="text" placeholder="invoiceNumber" v-model="invoiceNumber">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Invoice Date:</label>
                        <div class="control has-icons-left has-icons-right">
                            <datepicker v-model="invoiceDate"  :format="customFormatter" class="inputType"></datepicker>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Salesman Name</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="text" placeholder="userName" v-model="userName" >
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                Product Details
                </p>
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
                            <input class="input" type="text" placeholder="productCode" v-model="productCode" @click="onProductCodeClick">
                        </div>
                        <div v-if="show"><ModalForProducts :show="show" @rowClicked="rowClicked"/></div>
                    </div>
                    <div class="field">
                        <label class="label">Product Name</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="text" placeholder="productName" v-model="productName" disabled>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Price</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="number" placeholder="price" v-model="price" disabled>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Quantity</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="number" placeholder="quantity" v-model="quantity">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Unit</label>
                        <div class="control">
                            <div class="select">
                                <select v-model="unit" disabled>
                                    <option disabled value="">Select Value</option>
                                    <option>KG</option>
                                    <option>Per Piece</option>
                                </select>
                            </div>
                        </div>
                    </div>
                     <div class="field">
                        <label class="label">Amount</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="number" placeholder="amount" v-model="calculateAmount" disabled>
                        </div>
                    </div>
                    
                     <div class="field">
                        <label class="label">Gst</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="number" placeholder="GST" v-model="vat" disabled>%
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">TotalAmount</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="number" placeholder="Total" v-model="calculateTotal">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <label class="radio">
                                <input type="radio" name="tax" v-model="taxType" value="1"> Including Tax
                            </label>
                            <label class="radio">
                                <input type="radio"  name="tax" v-model="taxType" value="0"> Non-including Tax
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="card-footer">
                <a @click="addProducts" class="card-footer-item">Add</a>
                <a @click="updatePr" class="card-footer-item">Update</a>
                <a @click="resetproduct" class="card-footer-item">Reset</a>
            </footer>
        </div>
        <div class="card">
            <div class="card-content">
                <div class="content">
                    <vue-good-table
                        :columns="productColumns"
                        :rows="products"
                        >
                    </vue-good-table>
                </div>
            </div>
        </div>
    </div>
    <div class="column is-half "> 
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                Customer Details
                </p>
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
                            <input class="input" type="text" v-model="customerId" @click="onCustomerIdClick">
                            <div v-if="showCustomerModal"><ModalForCustomers :showCustomerModal="showCustomerModal" @rowClicked="customerRowClicked"/></div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Customer Name</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="text" v-model="customerName" >
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">State</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="text" v-model="state" >
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Address</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="text"  v-model="address" >
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Contact No.</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="number"  v-model="contact" maxlength="10" >
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Customer Gst No.</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="text"  v-model="gstNumber" >
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                Payment Info
                </p>
                <a href="#" class="card-header-icon" aria-label="more options">
                <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </a>
            </header>
            <div class="card-content">
                <div class="content">
                    <div class="field">
                        <label class="label">Payment Mode</label>
                        <div class="control">
                            <div class="select">
                                <select v-model="mode">
                                    <option disabled value="">Select Value</option>
                                    <option>Cheque</option>
                                    <option>Cash</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Payment</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="number" v-model="payment" >
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Payment Date</label>
                        <div class="control has-icons-left has-icons-right">
                            <datepicker v-model="paymentDate"  :format="customFormatter" class="inputType"></datepicker>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="card-footer">
                <a @click="addCustomerDetail" class="card-footer-item">Add</a>
                <a href="#" class="card-footer-item">Update</a>
                <a href="#" class="card-footer-item">Delete</a>
            </footer>
        </div>

        <div class="card">
            <div class="card-content">
                <div class="content">
                    <vue-good-table
                        :columns="paymentColumns"
                        :rows="customerDetails">
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
                            <input class="input" type="text" v-model="calculateGrandTotal" >
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Total Payment</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="number" v-model="payment" >
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Payment Due</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="number" v-model="calculatePaymentDue" >
                        </div>
                    </div>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link" @click="saveInvoice">Save</button>
                    </div>
                    <div class="control">
                        <button class="button is-link is-light">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { createCustomer, updateProduct, createInvoice, getLastInvoiceNumber }  from '../repository';
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
import ModalForProducts from './ModalForProducts.vue';
import ModalForCustomers from './ModalForCustomers.vue';


var state = {
  date: new Date(),
}

export default {
    name: 'taxInvoiceForm',
    components: {
        Datepicker,
        ModalForProducts,
        ModalForCustomers
    },
  
  data(){
    return {
        customerDetails:[],
        paymentColumns: [
            {   
            label: 'Customer Name',
            field: 'customerName',
            },
            {   
            label: 'State',
            field: 'state',
            },
            {
            label: 'Payment Mode',
            field: 'mode',
            },
            {
            label: 'Payment',
            field: 'payment',
            },
            {
            label: 'Payment Date',
            field: 'paymentDate',
            },
        ],
        productColumns:[
            {
            label: 'PR Code',
            field: 'productCode',
            },
            {
            label: 'PR Name',
            field: 'productName',
            },
            {
            label: 'Price',
            field: 'price',
            },
            {
            label: 'Quantity',
            field: 'quantity',
            },
            {
            label: 'Vat',
            field: 'vat',
            },
            {
            label: 'HSN',
            field: 'HSN'
            },
            {
            label: 'Total',
            field: 'total'
            }
        ],
        products:[],
        productId:'',
        productCode: '',
        productName:'',
        price: '',
        quantity:'',
        unit: '',
        amount: 0,
        vat:'',
        taxType:'1',
        invoiceNumber:'',
        invoiceDate:'',
        userName:'Mahesh Gupta',
        customerId:'',
        customerName:'',
        state:'',
        address:'',
        contact:'',
        show: false,
        gstNumber:'',
        total: 0,
        showCustomerModal: false,
        mode:'',
        payment:0,
        paymentDate: '',
        grandTotal:0,
        paymentDue: 0
        
    }
  },
    computed: {
        calculateAmount(){
            return this.price * this.quantity;
        },
        calculateTotal(){
            let amount =  this.calculateAmount
                
            let aa = (amount * this.vat) / 100;

            if(this.taxType == '1'){
                return this.total = amount + aa;
            }else{
                return this.total = amount;
            }   
        },
        calculateGrandTotal(){
            return this.grandTotal =  this.products.reduce((accum,item) => accum + item.total, 0)
        },
        calculatePaymentDue(){
            return this.paymentDue = this.grandTotal - this.payment;
        },
    },
    mounted(){
        getLastInvoiceNumber().then(data => {
            if(data.length == 0  || (state.date.getMonth() + 1 == 4 && state.date.getDate() == 1)){
                this.invoiceNumber = this.generateInvoiceNumber(0);
            }else{
                let lastnumber= data[0].invoiceNumber;
                let counter = Number(lastnumber.substring(7, lastnumber.length));
                counter++ ;
                this.invoiceNumber = this.generateInvoiceNumber(counter);   
            }
        })
        .catch(err => alert(err.message));
        this.invoiceDate = state.date;
        this.paymentDate = state.date;
    },
    methods: {

    generateInvoiceNumber(counter){
        const prefix = 'PB';
        let fullYear = state.date.getFullYear();
        let b  = String(counter).padStart(2, '0')
        return prefix + '-'+fullYear + b;
    },    
    customFormatter(date) {
        return moment(date).format('DD/MM/YYYY');
    },
    onProductCodeClick(){
        this.show = !this.show;
    },
    rowClicked(data){
        this.show = !this.show;
        this.productCode = data.productCode;
        this.productName = data.productName;
        this.price = data.price;
        this.unit = data.unit;
        this.amount = data.price;
        this.vat = data.vat;
        this.productId = data.id;
    },
    addProducts(){
        const found = this.products.some(el => el.productCode === this.productCode);
        if (!found) {
            let data  =  {
            productCode: this.productCode, 
            productName: this.productName , 
            price: this.price, 
            vat: this.vat,
            quantity: this.quantity, 
            unit: this.unit,
            total: this.total
            }
            this.products.push(data);
        }
    },

    updatePr(){
        let data  =  {
            qtyAvailable: this.quantity, 
        }

        updateProduct(data, this.productId)
        .then(data => {
           alert('product is successfully updated');
        })
        .catch(err => alert(err.message));

    },
    resetproduct(){
        this.productCode = '';
        this.productName = '';
        this.price = 0 ;
        this.vat = 0;
        this.quantity = 0;
        this.unit ='';
        this.total = 0; 
    },
    onCustomerIdClick(){
        this.showCustomerModal = !this.showCustomerModal;
    },
    customerRowClicked(data){
        this.showCustomerModal = !this.showCustomerModal;
        this.customerId = data.customerId;
        this.customerName = data.customerName;
        this.state = data.state;
        this.address = data.address;
        this.contact = data.contact;
        this.gstNumber = data.gstNumber;
    },
    addCustomerDetail(){
        if(this.customerId !== undefined && this.customerId != ''){
        let data = {
            customerId : this.customerId,
            customerName: this.customerName,
            state: this.state,
            address: this.address,
            contact: this.contact,
            gstNumber: this.gstNumber,
            mode: this.mode,
            payment: this.payment,
            paymentDate: this.customFormatter(this.paymentDate)
        }
        this.customerDetails.push(data);
        }
    },
    saveInvoice(){
        let invoiceData = {
            invoiceNumber : this.invoiceNumber,
            invoiceDate: this.invoiceDate,
            username: this.username,
            products: this.products,
            customerId: this.customerId,
            customerName:this.customerName,
            paymentMode: this.mode,
            totalAmount: this.grandTotal,
            payment: this.payment,
            paymentDate: this.customFormatter(this.paymentDate)
        }
        createInvoice(invoiceData)
        .then(data => {
           alert('Invoice is successfully created');
        })
        .catch(err => alert(err.message));
    },
    getList(){
         this.$router.push('/getCustomers');
    }
  },
}
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
</style>