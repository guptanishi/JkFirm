const db = require("../models");
const CashMemo = db.cashMemos;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.invoiceNumber) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a Tutorial
    const cashMemo = new CashMemo({
        invoiceNumber: req.body.invoiceNumber,
        invoiceDate: req.body.invoiceDate,
        delMode: req.body.delMode,
        userName: req.body.userName,
        products: req.body.products,
        customerId: req.body.customer.customerId,
        customerName: req.body.customer.customerName,
        totalAmount: req.body.totalAmount,
        paymentMode: req.body.paymentMode,
        payment: req.body.payment,
        paymentDate: req.body.paymentDate
    });
    // Save product in the database
    cashMemo
        .save(cashMemo)
        .then(data => {
            console.log(data)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the cashMemo."
            });
        });
};

exports.findLastMemoInvoiceNumber = (req, res) => {
    CashMemo.find().sort({ "_id": -1 }).limit(1).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving invoice."
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    CashMemo.findByIdAndRemove(id, { useFindAndModify: false })
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

exports.findAll = (req, res) => {
    const invoiceNumber = req.query.invoiceNumber;
    var condition = invoiceNumber ? { invoiceNumber: { $regex: new RegExp(invoiceNumber), $options: "i" } } : {};

    CashMemo.find(condition)
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

exports.delete = (req, res) => {
    const id = req.params.id;

    CashMemo.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete cash memo with id=${id}. Maybe invoice was not found!`
                });
            } else {
                res.send({
                    message: "cash memo was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete cash memo with id=" + id
            });
        });
};