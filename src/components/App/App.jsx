import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Home from "../Home/Home";
import Workspace from "../Workspace/Workspace";
import Analysis from "../Analysis/Analysis";
import styles from "./App.module.scss";
import "../../scss/global.scss";

const App = () => {
  return (
    <Router>
      <div className={styles["app"]}>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/workspace">
            <Workspace />
          </Route>
          <Route path="/analysis">
            <Analysis />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
