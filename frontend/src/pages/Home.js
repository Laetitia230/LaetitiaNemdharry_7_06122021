import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import NewPost from "../components/Post/NewPost";
import WallPost from "../components/Post/WallPost";
import { Redirect } from "react-router";

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
         <Redirect to="/profil" />
        <h1></h1>
        </>
      )}
    </div>
    
  
  );
};

export default Home;
