import React from "react";
import Article from "../Article/Article";
import profile_image from "../../images/profile.jpg";
import styles from "./ArticleList.module.scss";
import classNames from "classnames";

const ArticleList = () => {
  return (
    <div
      className={classNames(
        styles["article-list"],
        "d-flex flex-column justify-content-between"
      )}
    >
      <ul className="list-group">
        <Article
          img={{ src: profile_image, alt: "profile_image" }}
          name="Jiankai Xiao"
          time={new Date().toLocaleString()}
          title="Project Introduction: Component Tree"
          to="/component-tree"
        />
        <Article
          img={{ src: profile_image, alt: "profile_image" }}
          name="Jiankai Xiao"
          time={new Date().toLocaleString()}
          title="Project Introduction: Component Graph"
          to="/component-graph"
        />
      </ul>

      <nav className="align-self-center" aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ArticleList;
