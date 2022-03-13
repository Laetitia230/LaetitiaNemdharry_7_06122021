import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";

// AFFICHAGE DE LA PAGE HOME AVEC DIFFERENTE CONDITION (SI L'UTILISATEUR EST CONNECTE OU NON)
const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      {uid ? (
        <UpdateProfil />
      ) : (
        <div className="log-container">
          <Log />
        </div>
      )}
    </div>
  );
};

export default Profil;
