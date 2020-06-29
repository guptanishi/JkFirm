'use strict';

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


const db = require("./app/models");
console.log(db.url);
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/",(req,res)=>{
  let p= path.resolve(__dirname,'dist','index.html');
  console.log("p",p);
  res.sendFile(p);
})

require("./app/routes/product.routes")(app);

app.get("*", (req, res) => {
  let p= path.resolve(__dirname,'dist','index.html');
  res.sendFile(p);
}); 

const PORT = process.env.PORT || 3001;

app.listen(PORT);
console.log('api runnging on port ' + PORT + ': ');