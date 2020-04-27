const dgram = require("dgram");
const server = dgram.createSocket("udp4");
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const SELECT_ALL_TRUCKS = "SELECT * FROM camiones";
const connection = mysql.createConnection({
  host: "camiones.cegoasvw0wpw.us-east-1.rds.amazonaws.com",
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

server.on("message", (msg, rinfo) => {
  coordinates = msg;
  message = msg.toString();
  const plusSign = message.indexOf("+");
  const minusSign = message.indexOf("-");
  const latitud =
    message.substring(plusSign + 1, plusSign + 3) +
    "." +
    message.substring(plusSign + 3, plusSign + 8);
  const longitud =
    "-" +
    message.substring(minusSign + 2, minusSign + 4) +
    "." +
    message.substring(minusSign + 4, minusSign + 9);
  const janTimeMilli = new Date("January 5, 1980 19:00:00").getTime();
  const numWeeks = parseInt(message.substring(6, 10));
  const numSeconds = parseInt(message.substring(11, 16));
  const numWeeksMilli = numWeeks * 7 * 24 * 60 * 60 * 1000;
  const dateWeek = parseInt(message.substring(10, 11)) * 24 * 60 * 60 * 1000;
  const time = numSeconds * 1000 + numWeeksMilli + janTimeMilli + dateWeek;
  const time1 = new Date(time).toString();
  connection.query(`INSERT INTO camiones (latitud, longitud, date)
  VALUES ('${latitud}', '${longitud}', '${time1}')
  `);
  console.log(`server got: ${time1} from ${rinfo.address}:${rinfo.port}`);
});

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

app.use(express.json());
app.post("/mobile", (request, response) => {
  console.log("llego un mensaje");
  console.log(request.body);
  var msg1 = request.body;
  var lat = request.body.latitud;
  var lon = request.body.longitud;
  var timestamp = parseInt(request.body.timestamp) - 3600 * 5 * 1000;
  var datete = new Date(timestamp * 1);
  var hours = datete.getHours();
  var minutes = "0" + datete.getMinutes();
  var seconds = "0" + datete.getSeconds();
  var tiemporeal = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  const time2 = new Date(timestamp);
  console.log(lat, lon, time2);
  connection.query(`INSERT INTO camiones (latitud, longitud, date)
  VALUES ('${lat}', '${lon}', '${time2}')
  `);
  response.json({
    status: "listo pah",
  });
});

app.listen(5000, () => {
  console.log("Listening on Port 5010");
});
server.bind(5010);
