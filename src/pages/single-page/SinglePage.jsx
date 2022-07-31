import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Banner from "../../components/comics/banner/banner";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import Spinner from "../../components/spinner/Spinner";
import useMarvelService from "../../services/MarvelService";
import "./SinglePage.scss";

const SinglePage = ({ Component, type }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { loading, error, getComicsById, getCharacterById, clearError } =
    useMarvelService();

  useEffect(() => {
    updateData();
  }, [id]);

  const updateData = () => {
    clearError();

    switch (type) {
      case "comics":
        getComicsById(id).then(onDataLoaded);
        break;
      case "character":
        getCharacterById(id, false).then(onDataLoaded);
    }
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !data) ? (
    <Component data={data} />
  ) : null;

  return (
    <>
      <Banner />
      <div className="single-page">
        {errorMessage}
        {spinner}
      </div>

      {content}
    </>
  );
};

export default SinglePage;
