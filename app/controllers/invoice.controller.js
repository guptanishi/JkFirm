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
        userName: req.body.userName,
        products: req.body.products,
        customerId: req.body.customerId,
        customerName: req.body.customerName,
        totalAmount: req.body.totalAmount,
        paymentMode: req.body.paymentMode,
        payment: req.body.payment,
        paymentDate: req.body.paymentDate,
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
  const invoiceNumber = req.query.invoiceNumber;
  var condition = invoiceNumber ? { invoiceNumber: { $regex: new RegExp(invoiceNumber), $options: "i" } } : {};

  Invoice.find(condition)
    .then(data => {
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
    //console.log(Invoice.find().sort({"_id" : -1}).limit(1))
    Invoice.find().sort({"_id" : -1}).limit(1).then(data => {
        res.send(data);
   })
   .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving invoice."
      });
    });
};

// //Find a single Tutorial with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Customer.findById(id)
//     .then(data => {
//       if (!data)
//         res.status(404).send({ message: "Not found Customer with id " + id });
//       else res.send(data);
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .send({ message: "Error retrieving Customer with id=" + code });
//     });
// };

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update can not be empty!"
//     });
//   }

//   const id = req.params.id;

//   Customer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update Customer with id=${id}. Maybe Customer was not found!`
//         });
//       } else res.send({ message: "Customer was updated successfully." });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating Customer with id=" + id
//       });
//     });
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Customer.findByIdAndRemove(id, { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
//         });
//       } else {
//         res.send({
//           message: "Customer was deleted successfully!"
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete Customer with id=" + id
//       });
//     });
// };

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
