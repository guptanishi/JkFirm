'use strict';

// const express = require('express');
// const app = express();
// const cors = require('cors');
// const bodyParser = require('body-parser');
// var serveStatic = require('serve-static');


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
// app.use(serveStatic(__dirname + "/dist"));


var http = require('http');
const PORT = process.env.PORT || 3001;
//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
 
}).listen(PORT); //the server object listens on port 8080

// const db = require("./app/models");
// console.log(db.url);
// db.mongoose
//   .connect(db.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("Connected to the database!");
//   })
//   .catch(err => {
//     console.log("Cannot connect to the database!", err);
//     process.exit();
//   });

// simple route
// app.get("/", (req, res) => {
//   var p=__dirname + '/dist/index.html';
//   console.log("p",p);
//   res.sendFile(__dirname + '/dist/index.html');
// }); 

// require("./app/routes/product.routes")(app);

// app.get("*", (req, res) => {
//   res.sendFile(__dirname + '/dist/index.html');
// }); 


// const PORT = process.env.PORT || 3001;

// app.listen(PORT);
// console.log('api runnging on port ' + PORT + ': ');