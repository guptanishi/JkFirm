module.exports = app => {
  const products = require("../controllers/product.controller.js");

  const customers = require("../controllers/customer.controller.js");

  const invoices = require("../controllers/invoice.controller.js");

  const cashMemos = require("../controllers/cashMemo.controller.js");

  var router = require("express").Router();

  // Create a new Product
  router.post("/products/create", products.create);

  // Retrieve all Product
  router.get("/products/", products.findAll);

  // get a Product with id
  //router.get("/products/:id", products.findOne);

  // Update a Product with id
  router.post("/products/:id", products.update);

  // Delete a Product with id
  router.delete("/products/:id", products.delete);

  // get a Product with id
  router.get("/products/lastRecord", products.findLastRecord);

  router.post("/customers/create", customers.create);

  // Retrieve all customers
  router.get("/customers/", customers.findAll);

  // Update a customer with id
  router.post("/customers/:id", customers.update);

  // Delete a customer with id
  router.delete("/customers/:id", customers.delete);

  // Retrieve all customers
  router.get("/customers/lastRecord", customers.findLastRecord);

  // Retrieve all invoices
  router.get("/invoices/", invoices.findAll);

  router.post("/invoices/create", invoices.create);

  router.post("/invoices/:id", invoices.update);

  router.get("/invoices/lastRecord", invoices.findLastIdRowInvoiceNumber);

  router.delete("/invoices/:id", invoices.delete);

  router.post("/cashMemo/create", cashMemos.create);

  router.get("/cashMemo/lastRecord", cashMemos.findLastMemoInvoiceNumber);

  router.get("/cashMemos/", cashMemos.findAll);

  router.delete("/cashMemos/:id", cashMemos.delete);

  app.use("/api", router);


};
