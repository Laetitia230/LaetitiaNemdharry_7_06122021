import React, { useState } from "react";
import axios from "axios";
require("dotenv").config();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // FONCTION QUI PERMET LA CONNEXION D'UN UTILISATEUR GRACE A UN APPEL API AXIOS AU BACKEND: LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    const data = { email, password };
    axios
      .post("http://localhost:5000/api/user/login/", data)
      .then((res) => {
        if (res.data.error) {
          emailError.innerHTML = res.data.error;
          passwordError.innerHTML = "";
        } else if (res.data.error2) {
          emailError.innerHTML = "";
          passwordError.innerHTML = res.data.error2;
        } else {
          window.location = "/";
          sessionStorage.setItem("authToken", res.data.token);
          sessionStorage.setItem("userID", res.data.id);
          sessionStorage.setItem("pseudo", res.data.pseudo);
          sessionStorage.setItem("admin", res.data.isAdmin);
        }
      })
      .catch((error) => {
        error.json({ error });
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form" >
    <label htmlFor="email">Email</label>
    <br />
    <input type="texte" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
    <div className="email error"></div>
    <br/>
    <label htmlFor="password">Mot de passe</label>
    <br />
    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
    <div className="password error"></div>
    <br />
    <input type="submit" value="Se connecter" />
    


</form>
  );
};

export default Login;
