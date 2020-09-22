import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import styles from "./Header.module.scss";
import classNames from "classnames";

const Header = () => {
  return (
    <header>
      <nav
        className={classNames(
          styles["navbar"],
          "navbar navbar-expand-lg navbar-dark"
        )}
      >
        <img className={styles["logo"]} src={logo} alt="logo" />
        <p
          className={classNames(
            styles["navbar-brand"],
            "navbar-brand text-white"
          )}
        >
          DashBoard
        </p>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <Link to="/">
              <li className={classNames(styles["nav-item"], "nav-items")}>
                <i className="fas fa-home text-white"></i>
                <p
                  className={classNames(
                    styles["nav-link"],
                    "nav-link text-white"
                  )}
                >
                  Home
                </p>
              </li>
            </Link>
            <Link to="/workspace">
              <li className={classNames(styles["nav-item"], "nav-items")}>
                <i className="fas fa-chart-line text-white"></i>
                <p
                  className={classNames(
                    styles["nav-link"],
                    "nav-link text-white"
                  )}
                >
                  Workspace
                </p>
              </li>
            </Link>
            <Link to="/analysis">
              <li className={classNames(styles["nav-item"], "nav-items")}>
                <i className="far fa-lightbulb text-white"></i>
                <p
                  className={classNames(
                    styles["nav-link"],
                    "nav-link text-white"
                  )}
                >
                  Analysis
                </p>
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
