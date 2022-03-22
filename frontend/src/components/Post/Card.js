import React, { useContext, useEffect, useState } from "react";
import { AdminContext, UidContext } from "../AppContext";
import CardComment from "./CardComment";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import Moment from "react-moment";
import "moment/locale/fr";
import { NavLink } from "react-router-dom";

// AFFICHAGE D'UN POST
const Card = ({ post }) => {
  // RECUPERATION DES INFO DANS LE PROPS POST ET AFFICHAGE DYNAMIQUE DES DIFFERENTES INFORMATIONS
  const uid = useContext(UidContext);
  const admin = useContext(AdminContext);
  const [showComment, setShowComment] = useState(false);
  const [commentLength, setCommentLength] = useState("");

  useEffect(() => {
    setCommentLength(post.Comments.length);
    
  }, [showComment, commentLength, post.Comments.length]);
  
  return (
    <li className="card-container" key={post.id}>
      <div className="card-left">
        <NavLink exact to={`/profil/${post.User.id}`}>
          <img src={post.User.photo} alt="" />
        </NavLink>
      </div>
      <div className="card-right">
        <div className="card-header">
          
            <h2>{post.User.pseudo} </h2>
         

          <span>
            <p>Il y a </p>
            <Moment fromNow ago>
              {post.updatedAt}
            </Moment>
          </span>
        </div>
        <div className="card-main">
          <p>{post.message}</p>
          
          {post.picture && (
            <img src={post.picture} alt="img du post" className="card-pic" />
          )}
          
        </div>
        <div className="card-footer">
          <div className="comment-icon">
            <i
              className="far fa-comment"
              onClick={() => setShowComment(!showComment)}
            ></i>
            <span>{commentLength}</span>
          </div>
          <LikeButton post={post} />
          {parseInt(uid) === post.User.id || parseInt(admin) === 1 ? (
            <DeleteButton post={post} />
          ) : null}
        
         
        </div>
        {showComment &&<CardComment post={post} />}
        
      </div>
    </li>
  );
};

export default Card;