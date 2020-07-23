const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.products = require("./product.model.js")(mongoose);
db.customers = require("./customer.model.js")(mongoose);
db.invoices = require("./invoice.model.js")(mongoose);
db.cashMemos = require("./cashMemo.model.js")(mongoose);
module.exports = db;
