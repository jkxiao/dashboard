import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import styles from "./Article.module.scss";
import classNames from "classnames";

const Article = (props) => {
  let {
    img: { src, alt },
    name,
    time,
    title,
    to,
  } = props;
  let { url } = useRouteMatch();
  return (
    <li className="list-group-item d-flex-column justify-content-between align-items-center">
      <div className="d-flex justify-content-between align-items-center">
        <img src={src} className={classNames(styles["profile-image"], "mr-3")} alt={alt} />
        <strong className="mr-auto">{name}</strong>
        <small>{time}</small>
      </div>
      <hr />
      <Link to={url + to}>
        <div>{title}</div>
      </Link>
    </li>
  );
};

export default Article;
