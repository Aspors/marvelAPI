import "./ComicsItems.scss";
import useMarvelService from "../../../services/MarvelService";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../error-message/ErrorMessage";

const ComicsItems = () => {
  const [offset, setOffset] = useState(0);
  const [comics, setComics] = useState([]);
  const [comicsLoading, setComicsLoading] = useState(false);

  const { getComisc, loading, error } = useMarvelService();

  useEffect(() => {
    onRequest(0, true);
  }, []);

  const onRequest = (offset = 0, initial) => {
    initial ? setComicsLoading(false) : setComicsLoading(true);

    getComisc(offset).then(onComicsLoaded);
  };

  const onComicsLoaded = (arrayComics) => {
    setComics((comics) => [...comics, ...arrayComics]);
    setComicsLoading(false);
    setOffset((offset) => offset + 8);
  };

  const handleLoadMore = () => {
    onRequest(offset, false);
  };

  const createComicsItems = comics.map(
    ({ thumbnail, title, price, url }, key) => {
      return (
        <div key={key} className="comics__item">
          <a href={url} className="item__link">
            <img src={thumbnail} alt="cover" className="cover" />
            <span className="title">{title}</span>
          </a>
          <span className="price">{price}</span>
        </div>
      );
    }
  );

  const spinner = loading && !comicsLoading ? <Spinner /> : null;
  const err = error ? <ErrorMessage /> : null;
  const content = !(loading && error) ? createComicsItems : null;

  return (
    <>
      <div className="comics">
        {spinner}
        {err}
        {content}
      </div>
      <button
        onClick={handleLoadMore}
        disabled={comicsLoading}
        className="button button_load"
        style={{ marginBottom: 50 }}>
        load more
      </button>
    </>
  );
};

export default ComicsItems;
