import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../Routes/Routes.js";
import { withRouter } from "react-router-dom";
import "./Navigation.css";

function Navigation(props) {
  const logout = () => {
    props.history.replace("/"); //Irse a página de login al hacer logout
  };

  return (
    <div className="bodyy">
      <section>
        <header>
          <div className="navBox">
            <ul className="extra">
              <li>
                <Link to={ROUTES.HOME}>Home</Link>
              </li>
              <li>
                <Link to={ROUTES.HISTORICOS}>Históricos</Link>
              </li>
              <li>
                <Link to={ROUTES.LUGAR}>Históricos por Lugar</Link>
              </li>
            </ul>
          </div>
        </header>
      </section>
    </div>
  );
}
export default withRouter(Navigation);
