import React, { useContext, useEffect, useState } from "react";
import { AdminContext, UidContext } from "../AppContext";
import axios from "axios";
import { timestampParser } from "../Utils";
import Swal from "sweetalert2";

// AFFICHAGE DES COMMENTAIRE + NOUVEAU COMMENTAIRE + SUPPRESSION COMMENTAIRE D'UN POST
const CardComment = ({ post }) => {
  const uid = useContext(UidContext);
  const admin = useContext(AdminContext);
  const [message, setMessage] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const PostId = post.id;

  useEffect(() => {
    // RECUPERATION DES COOMENTAIRES D'UN POST GRACE A L'APPEL API AXIOS DU BACEND: getAllComment
    const getComment = async () => {
      await axios({
        method: "get",
        url: `http://localhost:5000/api/comment/${PostId}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      }).then((res) => {
        setCommentList(res.data);
      });
    };
    getComment();
  }, [isLoaded]);

  const handleComment = (e) => {
    // CREATION D'UN NOUVEAU COMMENTAIRE + ENVOI DB SQL
    e.preventDefault();

    const data = {
      UserId: uid,
      PostId: PostId,
      message: message,
    };

    axios
      .post("http://localhost:5000/api/comment/", data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      })
      .then(() => {
        setMessage("");
        if (isLoaded) {
          setIsLoaded(false);
        } else {
          setIsLoaded(true);
        }
      });
  };

  const deleteComment = async (id) => {
    // SUPPRESSION D'UN COMMENTAIRE DANS LA DB SQL
    await Swal.fire({
      title: "Etes vous sûr?",
      text: "Vous allez supprimer ce commentaire définitivement!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok !",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Supprimé", "votre commentaire a été supprimé", "success");
        axios({
          method: "delete",
          url: `http://localhost:5000/api/comment/${id}`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }).then(() => {
          setMessage("");
          if (isLoaded) {
            setIsLoaded(false);
          } else {
            setIsLoaded(true);
          }
        });
      }
    });
  };

  return (
    <div className="comments-container">
      {commentList.map((comment) => {
        return (
          <div
            className={
              comment.User.id === post.UserId
                ? "comment-container client"
                : "comment-container"
            }
            key={comment.id}
          >
            <img src={comment.User.photo} alt="img de profil" />
            <div className="right-comment">
              <div className="header-comment">
                {comment.User.pseudo === "Lr4mquGt64H6pjU39N3Y" ? (
                  <h3 className="admin-pseudo">ADMIN</h3>
                ) : (
                  <h3>{comment.User.pseudo}</h3>
                )}

                <span>{timestampParser(comment.updatedAt)}</span>
              </div>
              <div className="main-comment">
                <p>{comment.message}</p>
              </div>
              <div className="footer-comment">
                {uid === comment.UserId || admin === 1 ? (
                  <i
                    className="far fa-trash-alt"
                    onClick={() => deleteComment(comment.id)}
                  ></i>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
      <form action="" onSubmit={handleComment} className="comment-form">
        <input
          type="text"
          name="message"
          on
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Laisser un commentaire"
          required
          autoFocus
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default CardComment;
