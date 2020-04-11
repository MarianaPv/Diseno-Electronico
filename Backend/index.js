const dgram = require("dgram");
const server = dgram.createSocket("udp4");
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const SELECT_ALL_TRUCKS = "SELECT * FROM camiones";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "camiones",
  password: "password",
});

let coordinates;
let message;

connection.connect(function (err) {
  if (err) throw err;
  console.log("Node connected ");
});

server.on("error", (err) => {
  console.log(err.stack);
  server.close();
});

server.on("message", (msg, rinfo) => {});

server.on("listening", () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("go to /coords to see info");
});

app.get("/coords", (req, res) => {
  connection.query(SELECT_ALL_TRUCKS, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data1: results,
      });
    }
  });
});

app.get("/mobile", (req, res) => {
  res.send("hello moto");
});

app.listen(5000, () => {
  console.log("Listening on Port 5000");
});
server.bind(5000);
