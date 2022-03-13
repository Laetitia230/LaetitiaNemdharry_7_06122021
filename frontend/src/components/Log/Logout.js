import React from "react";

const Logout = () => {
  const logOut = () => {
    //FONCTION QUI PERMET LA DECONNEXION D'UN UTILISATEUR GRACE A LA SUPPRESSION DES DIFFERENTES KEY ENREGISTRE DANS LA SESSION STORAGE
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userID");
    sessionStorage.removeItem("pseudo");
    sessionStorage.removeItem("admin");

    window.location = "/profil";
  };
  return (
    <li onClick={logOut} className="logout" title="deconnexion">
      <div>
        <i className="fas fa-sign-out-alt"></i>
      </div>
    </li>
  );
};

export default Logout;
