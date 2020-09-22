import React from "react";
import { useRouteMatch, Link } from "react-router-dom";

const Card = (props) => {
  let {
    title,
    description,
    img: { src, alt },
    to,
  } = props;
  let { url } = useRouteMatch();
  return (
    <div className="col mb-4">
      <div className="card">
        <img src={src} className="card-img-top" alt={alt} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <Link to={url + to}>
            <div className="btn btn-primary">Create Figure</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
