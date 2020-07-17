import Vue from 'vue';
import Router from 'vue-router';
import CreateProduct from './components/CreateProduct';
import LoadProductList from './components/LoadProductList';
import UpdateProduct from './components/UpdateProduct';
import CustomersList from './components/CustomersList';
import CreateCustomer from './components/CreateCustomer';
import UpdateCustomer from './components/UpdateCustomer';
import TaxInvoiceForm from './components/TaxInvoiceForm';
import TaxInvoicesList from './components/TaxInvoicesList';
import PdfGenerator from './components/PdfGenerator';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

Vue.use(Router)

export default new Router({
    routes: [

        {
            path: '/',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/homePage',
            name: 'homePage',
            component: HomePage
        },
        {
            path: '/loadProducts',
            name: 'loadproductList',
            component: LoadProductList
        },

        {
            path: '/createProduct',
            name: 'createProduct',
            component: CreateProduct
        },

        {
            path: '/updateProduct',
            name: 'updateProduct',
            component: UpdateProduct,
            props: true

        },
        {
            path: '/getCustomers',
            name: 'loadCustomers',
            component: CustomersList,
        },
        {
            path: '/createCustomer',
            name: 'createCustomer',
            component: CreateCustomer,
        },
        {
            path: '/updateCustomer',
            name: 'updateCustomer',
            component: UpdateCustomer,
            props: true
        },
        {
            path: '/taxInvoice',
            name: 'taxInvoice',
            component: TaxInvoiceForm,
            props: true
        },
        {
            path: '/getInvoices',
            name: 'taxInvoiceList',
            component: TaxInvoicesList
        },
        {
            path: '/generatePdf',
            name: 'pdfGenerator',
            component: PdfGenerator,
            props: true
        },

    ]
})