import React from "react";
import { Link } from "react-router-dom";
import "./ComicsPage.scss";
import { Helmet } from "react-helmet";
const ComicsPage = ({ data }) => {
  const { thumbnail, title, description, pages, price } = data;

  return (
    <>
      <Helmet>
        <meta name="description" content={`${title} page`} />
        <title>{title}</title>
      </Helmet>
      <div className="comics__page">
        <div className="container">
          <img src={thumbnail} alt={title} />
          <div className="comics__description">
            <div className="title_flex">
              <span className="title">{title}</span>
              <Link className="back" to="/comics">
                Back to all
              </Link>
            </div>
            <p className="descr">{description}</p>
            <span className="pages">{pages}</span>
            <span className="language">Language: en-us</span>
            <span className="price">{price}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComicsPage;
