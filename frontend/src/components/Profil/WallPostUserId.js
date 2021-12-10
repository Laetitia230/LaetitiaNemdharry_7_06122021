import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Moment from "react-moment";
import { UidContext } from "../AppContext";
import "moment/locale/fr";
import { useParams } from "react-router";

// AFFICHAGE D'UN MUR AVEC LES DIFFERENTS POST QUE L'UTILISATEUR A PUBLIE
const WallPostUserId = ({ infoUser }) => {
  const uid = useContext(UidContext);
  const [listPostUser, setListPostUser] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // RECUPERATIONS DES INFORMATIONS GRACE A UN APPEL API AXIOS DANS LE BACKEND : getPostByUserId
    const getPostUser = async () => {
      await axios({
        method: "get",
        url: `http://localhost:5000/api/post/${id}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      }).then((res) => {
        setListPostUser(res.data.reverse());
      });
    };
    getPostUser();
  }, [uid, id]);

  return (
    <div className="postUser-container">
      {listPostUser.map((postUser) => {
        return (
          <li className="card-container" key={postUser.id}>
            <div className="card-left">
              <img src={infoUser.photo} alt="" />
            </div>
            <div className="card-right">
              <div className="card-header">
                {infoUser.pseudo === "Lr4mquGt64H6pjU39N3Y" ? (
                  <h2 className="admin-pseudo">ADMIN</h2>
                ) : (
                  <h2>{infoUser.pseudo}</h2>
                )}

                <span>
                  <p>Il y a</p>
                  <Moment fromNow ago>
                    {postUser.updatedAt}
                  </Moment>
                </span>
              </div>
              <div className="card-main">
                <p>{postUser.message}</p>
                {postUser.picture && (
                  <img
                    src={postUser.picture}
                    alt="img du post"
                    className="card-pic"
                  />
                )}
                {postUser.video && (
                  <iframe
                    width="560"
                    height="315"
                    src={postUser.video}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="youtube video player"
                  ></iframe>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </div>
  );
};

export default WallPostUserId;
