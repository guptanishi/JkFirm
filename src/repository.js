import axios from 'axios';
const BASE_URL = 'http://localhost:5000';

export function getProducts() {
	return axios.get(`${BASE_URL}/api/products`)
		.then(response => response.data);
}

export function deleteProducts(id){
	return axios.delete(`${BASE_URL}/api/products/${id}`)
		.then(response => response.data)
		.catch(err => Promise.reject(err.message));
}
export function createProduct(data) {
	return axios.post(`${BASE_URL}/api/products/create`, {productCode: data.productCode, productName: data.productName , 
		costPrice: data.costPrice, 
		price: data.sellingPrice, vat: data.gst, HSN: data.HSN , qtyAvailable: data.quantityAvailable, unit: data.unit})
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err.message));
}

export function updateProduct(data, id) {
	return axios.post(`${BASE_URL}/api/products/${id}`, data)
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err.message));
}

export function getOneProduct(id) {
	return axios.get(`${BASE_URL}/api/products/${id}`)
		.then(response => response.data);
}


// custome API

export function getCustomers() {
	return axios.get(`${BASE_URL}/api/customers`)
		.then(response => response.data);
}

export function deleteCustomer(id){
	return axios.delete(`${BASE_URL}/api/customers/${id}`)
		.then(response => response.data)
		.catch(err => Promise.reject(err.message));
}
export function createCustomer(data) {
	return axios.post(`${BASE_URL}/api/customers/create`, {customerId: data.customerId, 
		customerName: data.customerName , 
		gender: data.gender, 
		address:data.address,
		city: data.city, 
		state: data.state, pincode: data.pincode, 
		contact: data.contact , emailId: data.emailId,
		gstNumber: data.gstNumber})
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err.message));
}

export function updateCustomer(data, id) {
	return axios.post(`${BASE_URL}/api/customers/${id}`, {customerId: data.customerId, 
		customerName: data.customerName , 
		gender: data.gender, 
		address: data.address,
		city: data.city, 
		state: data.state, pincode: data.pincode, 
		contact: data.contact , emailId: data.emailId,
		gstNumber: data.gstNumber})
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err.message));
}

// Invoice APIs


export function createInvoice(data) {
	return axios.post(`${BASE_URL}/api/invoices/create`, data)
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err.message));
}

export function getLastInvoiceNumber() {
	return axios.get(`${BASE_URL}/api/invoices/lastRecord`)
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err.message));
		
}

export function getInvoices() {
	return axios.get(`${BASE_URL}/api/invoices`)
		.then(response => response.data);
}