const dgram = require("dgram");
const server = dgram.createSocket("udp4");
const express = require("express");
const app = express();
const cors = require("cors");

let coordinates;

server.on("error", err => {
  console.log(err.stack);
  server.close();
});

server.on("message", (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  coordinates = msg;
});
server.on("listening", () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

app.use(function(req, res, next) {
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
  res.json(`${coordinates}`);
});

app.listen(80, () => {
  console.log("Listening on Port 5000");
});
server.bind(5000);
