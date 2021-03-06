import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import NewPost from "../components/Post/NewPost";
import WallPost from "../components/Post/WallPost";

import Log from "../components/Log";

// AFFICHAGE DE LA PAGE HOME AVEC DIFFERENTE CONDITION (SI L'UTILISATEUR EST CONNECTE OU NON)
const Home = () => {
  const uid = useContext(UidContext);
  return (
    <div className="home-page">
      {uid ? (
        <div className="home-connect">
          <LeftNav />
          <div className="main">
            <div className="home-header">
              <NewPost />
            </div>
            <WallPost />
          </div>
        </div>
      ) : (
        <>
        <div className="profil-page connection-form">
         <div className="log-container ">
          <Log />
        </div>
        </div>
       
        </>
      )}
    </div>
    
  
  );
};

export default Home;
