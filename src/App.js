import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
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

  useEffect(() => {
    getInfo();
    setInterval(() => {
      getInfo();
    }, 1000);
  }, []);

  const getInfo = () => {
    fetch("http://localhost:5000/coords")
      .then(res => res.json())
      .then(data => setMessage(data))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <div>{message}</div>
      <div>Latitud: {latitud}</div>
      <div>Longitud: {longitud}</div>
    </div>
  );
}

export default App;
