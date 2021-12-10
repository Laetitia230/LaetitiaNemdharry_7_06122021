import axios from "axios";
import React, { useState } from "react";
import Login from "./Login";

const SignUp = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleSignUp = async (e) => {
    //FONCTION QUI PERMET LA CREATION D'UN UTILISATEUR ET L'ENVOI A LA BASE DE DONNEE SQL GRACE A L'APPEL API AXIOS DU BACKEND : SIGNUP
    e.preventDefault();

    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const confirmPasswordError = document.querySelector(".password-conf.error");

    confirmPasswordError.innerHTML = "";
    passwordError.innerHTML = "";
    emailError.innerHTML = "";
    pseudoError.innerHTML = "";

    if (password !== controlPassword) {
      confirmPasswordError.innerHTML =
        "Les mots de passe ne correspondent pas !";
    } else {
      await axios
        .post("http://localhost:5000/api/user/signup", {
          pseudo,
          email,
          password,
        })
        .then(() => {
          setFormSubmit(true);
        })
        .catch((err) => {
          if (err.response.data.error.length === 3) {
            emailError.innerHTML = err.response.data.error[0].message;
            passwordError.innerHTML = err.response.data.error[1].message;
            pseudoError.innerHTML = err.response.data.error[2].message;
          }
          if (err.response.data.error.length === 2) {
            if (err.response.data.error[0].path === "email") {
              emailError.innerHTML = err.response.data.error[0].message;
              if (err.response.data.error[1].path ==="password") {
                passwordError.innerHTML = err.response.data.error[1].message;
              } else {
                pseudoError.innerHTML = err.response.data.error[1].message;
              }
            } else if (err.response.data.error[0].path === "password") {
              passwordError.innerHTML = err.response.data.error[0].message;
              pseudoError.innerHTML = err.response.data.error[1].message;
            }
          } else {
            if (err.response.data.error[0].path=== "email") {
              emailError.innerHTML = err.response.data.error[0].message;
            } else if (err.response.data.error[0].path ==="password") {
              passwordError.innerHTML = err.response.data.error[0].message;
            } else if (err.response.data.error[0].path ==="pseudo") {
              pseudoError.innerHTML = err.response.data.error[0].message;
            }
          }
        });
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <Login />
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleSignUp} id="sign-up">
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
            autoFocus
          />
          <div className="pseudo error"></div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error"></div>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="true"
          />
          <div className="password error"></div>
          <br />
          <label htmlFor="password-conf">Confirmer mot de passe</label>
          <br />
          <input
            type="password"
            name="password-conf"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-conf error"></div>
          <br />
          <input
            type="submit"
            value="Valider inscription"
            className="validLS"
          />
        </form>
      )}
    </>
  );
};

export default SignUp;
