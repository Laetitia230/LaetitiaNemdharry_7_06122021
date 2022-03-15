import axios from "axios";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import "moment/locale/fr";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

// AFFICHAGE D'UN MUR AVEC LES DIFFERENTS POSTS QUE L'UTILISATEUR A LIKE
const WallLikeUserId = () => {
  const [listLikeUser, setListLikeUser] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // RECUPERATIONS DES INFORMATIONS GRACE A UN APPEL API AXIOS DANS LE BACKEND : getLikeUserId
    const getLikeUser = async () => {
      await axios({
        method: "get",
        url: `http://localhost:5000/api/like/user/${id}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      }).then((res) => {
        setListLikeUser(res.data.reverse());
      });
    };
    getLikeUser();
  }, [id]);

  return (
    <div className="likeUser-container">
      {listLikeUser.map((likeUser) => {
        return (
          <li className="card-container" key={likeUser.id}>
            <div className="card-left">
              <Link exact to={`/profil/${likeUser.user}`}>
                <img src={likeUser.photo} alt="" />
              </Link>
            </div>
            <div className="card-right">
              <div className="card-header">
                {likeUser.pseudo === "Lr4mquGt64H6pjU39N3Y" ? (
                  <h2 className="admin-pseudo">ADMIN</h2>
                ) : (
                  <h2>{likeUser.pseudo}</h2>
                )}

                <span>
                  <p>Il y a</p>
                  <Moment fromNow ago>
                    {likeUser.updatedAt}
                  </Moment>
                </span>
              </div>
              <div className="card-main">
                <p>{likeUser.message}</p>
                {likeUser.picture && (
                  <img
                    src={likeUser.picture}
                    alt="img du like"
                    className="card-pic"
                  />
                )}
              
              </div>
              <div className="card-footer">
                <i className="far fa-comment likewall "></i>
                <i className="fas fa-heart likewall"></i>
              </div>
            </div>
          </li>
        );
      })}
    </div>
  );
};

export default WallLikeUserId;
