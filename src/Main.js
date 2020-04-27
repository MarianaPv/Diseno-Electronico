import React, { Component, useState, useEffect, useRef } from "react";
import App from "./App";
import Historicos from "./Components/Historicos/Historicos";
import Lugar from "./Components/Lugar/Lugar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./Routes/Routes";

function Main() {
  return (
    <Router basename="Diseno-Electronico">
      <div>
        <Switch>
          <Route initial={true} exact path={ROUTES.HOME} component={App} />
          <Route exact path={ROUTES.HISTORICOS} component={Historicos} />
        </Switch>
      </div>
    </Router>
  );
}

export default Main;
