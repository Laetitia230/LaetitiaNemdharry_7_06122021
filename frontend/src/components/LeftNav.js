import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";

// BARRE DE NAVIGATION LATERAL QUI PERMET D'ALLER SUR LA PAGE ACCEUIL ET PROFIL
const LeftNav = () => {
  const uid = useContext(UidContext);
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink
            exact
            to="/"
            activeClassName="active-left-nav"
            name="page d'acceuil"
            title="page d'acceuil"
          >
            <i className="fas fa-home"></i>
          </NavLink>
          <br />
          <NavLink
            to={`/profil/${uid}`}
            activeClassName="active-left-nav"
            name="page profil"
            title="page profil"
          >
            <i className="far fa-user"></i>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
