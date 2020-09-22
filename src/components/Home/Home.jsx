import React from "react";
import { Link } from "react-router-dom";
import candlestick_image_1 from "../../images/candlestick_image_1.jpg";
import candlestick_image_2 from "../../images/candlestick_image_2.jpg";
import candlestick_image_3 from "../../images/candlestick_image_3.jpg";
import react_logo from "../../images/React.svg";
import redux_logo from "../../images/Redux.svg";
import bootstrap_logo from "../../images/Bootstrap.png";
import sass_logo from "../../images/Sass.svg";
import echarts_logo from "../../images/ECharts.png";
import graphql_logo from "../../images/GraphQL.svg";
import node_logo from "../../images/Node.svg";
import express_logo from "../../images/Express.png";
import mysql_logo from "../../images/MySQL.svg";
import styles from "./Home.module.scss";
import classNames from "classnames";

const Home = () => {
  return (
    <div className={"page-container"}>
      <section className={styles["home-section"]} id="introduction">
        <div
          className={classNames(
            styles["jumbotron"],
            "jumbotron jumbotron-fluid"
          )}
        >
          <div className="container">
            <h1 className="display-4 mb-4">Welcome to DashBoard!</h1>
            <p className="lead">
              A project for financial data visualization and analysis.
            </p>
            <p className="lead">
              <a href="#features">Learn More</a> about our features!
            </p>
            <hr className="my-4" />
            <p>Start with creating a candlestick chart on your own!</p>
            <Link to="/workspace">
              <div className="btn btn-primary btn-lg" role="button">
                Get Started
              </div>
            </Link>
          </div>
          <div className="p-5 m-5">
            <ul className="list-unstyled d-flex align-self-end justify-content-center">
              <li>
                <div
                  className={classNames(
                    styles["package-logo-container"],
                    "d-flex align-items-center mr-3"
                  )}
                >
                  <img
                    src={react_logo}
                    className={styles["package-logo"]}
                    alt="react_logo"
                  />
                </div>
              </li>
              <li>
                <div
                  className={classNames(
                    styles["package-logo-container"],
                    "d-flex align-items-center mr-3"
                  )}
                >
                  <img
                    src={redux_logo}
                    className={styles["package-logo"]}
                    alt="redux_logo"
                  />
                </div>
              </li>
              <li>
                <div
                  className={classNames(
                    styles["package-logo-container"],
                    "d-flex align-items-center mr-3"
                  )}
                >
                  <img
                    src={bootstrap_logo}
                    className={styles["package-logo"]}
                    alt="bootstrap_logo"
                  />
                </div>
              </li>
              <li>
                <div
                  className={classNames(
                    styles["package-logo-container"],
                    "d-flex align-items-center mr-3"
                  )}
                >
                  <img
                    src={sass_logo}
                    className={styles["package-logo"]}
                    alt="sass_logo"
                  />
                </div>
              </li>
              <li>
                <div
                  className={classNames(
                    styles["package-logo-container"],
                    styles["left-aligned"],
                    "d-flex align-items-center mr-3"
                  )}
                >
                  <img
                    src={echarts_logo}
                    className={styles["package-logo-v"]}
                    alt="echarts_logo"
                  />
                </div>
              </li>
              <li>
                <div
                  className={classNames(
                    styles["package-logo-container"],
                    "d-flex align-items-center mr-3"
                  )}
                >
                  <img
                    src={graphql_logo}
                    className={styles["package-logo"]}
                    alt="graphql_logo"
                  />
                </div>
              </li>
              <li>
                <div
                  className={classNames(
                    styles["package-logo-container"],
                    "d-flex align-items-center mr-3"
                  )}
                >
                  <img
                    src={node_logo}
                    className={styles["package-logo"]}
                    alt="node_logo"
                  />
                </div>
              </li>
              <li>
                <div
                  className={classNames(
                    styles["package-logo-container"],
                    "d-flex align-items-center mr-3"
                  )}
                >
                  <img
                    src={express_logo}
                    className={styles["package-logo"]}
                    alt="express_logo"
                  />
                </div>
              </li>
              <li>
                <div
                  className={classNames(
                    styles["package-logo-container"],
                    "d-flex align-items-center mr-3"
                  )}
                >
                  <img
                    src={mysql_logo}
                    className={styles["package-logo"]}
                    alt="mysql_logo"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles["home-section"]} id="features">
        <div
          id="carouselIndicators"
          className={classNames(styles["carousel"], "carousel slide")}
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselIndicators"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carouselIndicators" data-slide-to="1"></li>
            <li data-target="#carouselIndicators" data-slide-to="2"></li>
          </ol>
          <div
            className={classNames(styles["carousel-inner"], "carousel-inner")}
          >
            <div
              className={classNames(
                styles["carousel-item"],
                "carousel-item active"
              )}
            >
              <img
                src={candlestick_image_1}
                className="d-block w-100"
                alt="candlestick_image_1"
              />
              <div
                className={classNames(
                  styles["carousel-caption"],
                  "carousel-caption d-none d-md-block"
                )}
              >
                <h5>Daily Candlestick</h5>
                <p>
                  Create interactive and responsive candlestick chart within
                  multiple days, along with moving average lines
                </p>
              </div>
            </div>
            <div
              className={classNames(styles["carousel-item"], "carousel-item")}
            >
              <img
                src={candlestick_image_2}
                className="d-block w-100"
                alt="candlestick_image_2"
              />
              <div
                className={classNames(
                  styles["carousel-caption"],
                  "carousel-caption d-none d-md-block"
                )}
              >
                <h5>Intraday Candlestick</h5>
                <p>
                  Create interactive and responsive candlestick chart within one
                  day
                </p>
              </div>
            </div>
            <div
              className={classNames(styles["carousel-item"], "carousel-item")}
            >
              <img
                src={candlestick_image_3}
                className="d-block w-100"
                alt="candlestick_image_3"
              />
              <div
                className={classNames(
                  styles["carousel-caption"],
                  "carousel-caption d-none d-md-block"
                )}
              >
                <h5>Analysis Blog</h5>
                <p>Share your brilliant ideas with others!</p>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselIndicators"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselIndicators"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
