const db = require("../models");
const Invoice = db.invoices;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.invoiceNumber) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const invoice = new Invoice({
    invoiceNumber: req.body.invoiceNumber,
    invoiceDate: req.body.invoiceDate,
    delMode: req.body.delMode,
    userName: req.body.userName,
    products: req.body.products,
    customerId: req.body.customer.customerId,
    customerName: req.body.customer.customerName,
    address: req.body.customer.address,
    state: req.body.customer.state,
    contact: req.body.customer.contact,
    gstNumber: req.body.customer.gstNumber,
    totalAmount: req.body.totalAmount,
    paymentMode: req.body.paymentMode,
    payment: req.body.payment,
    paymentDate: req.body.paymentDate
  });
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

  Invoice.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

  Invoice.findByIdAndRemove(id, { useFindAndModify: false })
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

