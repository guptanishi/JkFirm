const db = require("../models");
const Invoice = db.invoices;

// The client sends the customer as a nested `customer` (an object, or an array
// with one item) but the Invoice schema stores flat customer fields. Mongoose
// strict mode silently drops unknown keys, so a nested `customer` in an update
// is ignored. Map it to the flat fields here, for both create and update.
const toInvoiceFields = (body) => {
  const customer = Array.isArray(body.customer) ? body.customer[0] : body.customer;
  const c = customer || {};

  const fields = {
    invoiceNumber: body.invoiceNumber,
    invoiceDate: body.invoiceDate,
    delMode: body.delMode,
    userName: body.userName,
    products: body.products,
    customerId: c.customerId,
    customerName: c.customerName,
    address: c.address,
    state: c.state,
    contact: c.contact,
    gstNumber: c.gstNumber,
    totalAmount: body.totalAmount,
    paymentMode: body.paymentMode,
    payment: body.payment,
    paymentDate: body.paymentDate
  };

  // Don't overwrite stored values with undefined/null when a field isn't sent
  Object.keys(fields).forEach((key) => {
    if (fields[key] === undefined) delete fields[key];
  });
  return fields;
};

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.invoiceNumber) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const invoice = new Invoice(toInvoiceFields(req.body));
  // Save product in the database
  invoice
    .save(invoice)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the invoice."
      });
    });
};

//Retrieve all invoices from the database.
exports.findAll = (req, res) => {
  Invoice.find().sort({invoiceDate: -1, invoiceNumber: -1})
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving invoice."
      });
    });
};

exports.findLastIdRowInvoiceNumber = (req, res) => {
  Invoice.find().sort({invoiceDate: -1, invoiceNumber: -1}).limit(1).then(data => {
    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving invoice."
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Invoice.findByIdAndUpdate(id, { $set: toInvoiceFields(req.body) }, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Invoice with id=${id}. Maybe Invoice was not found!`
        });
      } else res.send({ message: "Invoice was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Invoice with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Invoice.findByIdAndDelete(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Customer with id=${id}. Maybe invoice was not found!`
        });
      } else {
        res.send({
          message: "invoice was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete invoice with id=" + id
      });
    });
};

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//     Customer.deleteMany({})
//     .then(data => {
//       res.send({
//         message: `${data.deletedCount} Customer were deleted successfully!`
//       });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all Customer."
//       });
//     });
// };