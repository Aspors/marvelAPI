import "./CharPage.scss";
import { Helmet } from "react-helmet";

import React from "react";

const CharPage = ({ data }) => {
  const { name, description, thumbnail } = data;

  return (
    <div className="char-page">
      <Helmet>
        <meta name="description" content={`${name}'s Information Page`}></meta>
        <title>{name}</title>
      </Helmet>
      <div className="container">
        <img src={thumbnail} alt={name} className="char-page__img" />
        <h2 className="char-page__name">{name}</h2>
        <p className="char-page__descr">{description}</p>
      </div>
    </div>
  );
};

export default CharPage;
