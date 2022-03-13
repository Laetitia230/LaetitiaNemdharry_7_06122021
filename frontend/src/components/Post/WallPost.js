import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

//AFFICHAGE D'UN MUR DES DIFFERENTS POST DE LA DB SQL
const WallPost = () => {
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    // RECUPERATION DE TOUT LES POSTS GRACE A L'APPEL API AXIOS DANS LE BACKEND: getAllPost
    const getAllPost = async () => {
      await axios({
        method: "get",
        url: `http://localhost:5000/api/post/`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      }).then((res) => {
        setPostsList(res.data.reverse());
      });
    };
    getAllPost();
  }, []);

  return (
    <div className="wall-container" id="test">
      <ul>
        {postsList.map((post, key) => {
          return <Card post={post} key={post.id} />;
        })}
      </ul>
    </div>
  );
};

export default WallPost;
