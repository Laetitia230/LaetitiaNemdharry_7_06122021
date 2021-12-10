import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../../pages/Home";
import NotFound from "../../pages/NotFound";
import Profil from "../../pages/Profil";
import Navbar from "../Navbar";

//DIFFERENTES ROUTES ACCESIBLE SUR LE SITE WEB
const index = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/profil" exact component={Profil} />
        <Route path="/profil/:id" exact component={Profil} />
        <Route path="/" exact component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default index;
