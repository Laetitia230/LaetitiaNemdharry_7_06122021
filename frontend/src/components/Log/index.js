import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const Log = () => {
  const [signUpModal, setSignUpModal] = useState(false);
  const [logInModal, setLogInModal] = useState(true);

  // FONCTION POUR AFFICHER DYNAMIQUEMENT LE COMPONENT LOGIN OU SIGNUP
  const handleModals = (e) => {
    if (e.target.id === "signup") {
      setSignUpModal(true);
      setLogInModal(false);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setLogInModal(true);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="signup"
            className={signUpModal ? "active-btn" : null}
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={logInModal ? "active-btn" : null}
          >
            Se connecter
          </li>
        </ul>
        {logInModal && <Login />}
        {signUpModal && <SignUp />}
      </div>
    </div>
  );
};

export default Log;
