import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "../AppContext";
import { timestampParser } from "../Utils";

//SECTION NOUVEAU POST
const NewPost = () => {
  const [message, setMessage] = useState("");
  const [picture, setPicture] = useState("");
  const [video, setVideo] = useState("");
  const [file, setFile] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [photoUser, setPhotoUser] = useState("");
  const uid = useContext(UidContext);

  const handlePost = () => {
    // ENVOI DU NOUVEAU POST DANS LA DB SQL GRACE A UN APPEL API AXIOS DANS LE BACKEND: createPost
    if (message || picture || video) {
      const data = new FormData();
      data.append("UserId", uid);
      data.append("message", message);
      data.append("file", file);
      data.append("video", video);

      axios
        .post("http://localhost:5000/api/post/", data, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        })
        .then(() => {
          window.location.reload();
          cancelPost();
        });
    } else {
      alert("vous n'avez rien remplis");
    }
  };

  useEffect(() => {
    // RECUPERATION DES INFO D'UN USER GRACE A L'APPEL API AXIOS DANS LE BACKEND: me
    const getUser = async () => {
      await axios({
        method: "get",
        url: `http://localhost:5000/api/user/${uid}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      }).then((res) => {
        setPseudo(res.data.pseudo);
        setPhotoUser(res.data.photo);
      });
    };
    getUser();
  }, [uid]);

  const handlePicture = (e) => {
    // RECUPERRATION DES INFORMATION DE L'IMAGE A ENVOYER DANS LA DB SQL
    setPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
  };

  const handleVideo = () => {
    // RECUPERATION ET MODIFICATION DE L'URL DE LA VIDEO YOUTUBE POUR UN AFFICHAGE ET L'ENVOI A LA DB SQL
    let findLink = message.split(" ");
    for (let i = 0; i < findLink.length; i++) {
      if (
        findLink[i].includes("https://www.yout") ||
        findLink[i].includes("https://yout")
      ) {
        setVideo(findLink[i].replace("watch?v=", "embed/"));
        findLink.splice(i, 1);
        setMessage(findLink.join(""));
        setPicture("");
      }
    }
  };

  const cancelPost = () => {
    // ANNULATION DU NOUVEAU POST
    setMessage("");
    setPicture("");
    setVideo("");
    setFile("");
  };

  useEffect(() => {
    handleVideo();
  }, [message, video]);

  return (
    <div className="post-container">
      <div className="post-header">
        <NavLink to={`/profil/${uid}`}>
          <img src={photoUser} alt="img de profil" />
        </NavLink>
      </div>
      <div className="post-main">
        <textarea
          name="message"
          id="message"
          placeholder="Quoi de neuf?"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        ></textarea>
        {message || picture || video.length > 20 ? (
          <div className="card-container">
            <div className="card-left">
              <img src={photoUser} alt="img de profil" />
            </div>
            <div className="card-right">
              <div className="card-header">
                <h3>{pseudo}</h3>
                <span>{timestampParser(Date.now())}</span>
              </div>
              <div className="card-main">
                <p>{message}</p>
                <img src={picture} alt="" />
                {video && (
                  <iframe
                    src={video}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video}
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="post-footer">
        {video === "" && (
          <div className="icon">
            <i className="far fa-image"></i>
            <input
              type="file"
              id="file-upload"
              name="file"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => handlePicture(e)}
              title="ajouter une photo"
            />
          </div>
        )}
        {video && <button onClick={() => setVideo("")}>Supprimer video</button>}
        <div className="btn-send">
          {message || picture || video.length > 20 ? (
            <button className="cancel" onClick={cancelPost}>
              Annuler
            </button>
          ) : null}
          <button className="send" onClick={handlePost}>
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
