import React from "react";
import "./Welcome.css";

function Welcome(props) {
  return (
    <div className="parentWelcome">
      <div className="welcome">
        <div
          className="textStyle1"
          style={{ fontSize: "2em", marginTop: "1.5vh" }}
        >
          ¡Bienvenido a GeoLocation!
        </div>
        <div
          className="textStyle1"
          style={{ marginTop: "1.5vh", fontSize: "1.2em" }}
        >
          Presiona continuar para ver los datos de recorrido de tus productos.
        </div>
      </div>
      <div className="buttonWrapper">
        <button className="botonwel" onClick={() => props.welcomeChange()}>
          Continuar
        </button>
      </div>
    </div>
  );
}

export default Welcome;
