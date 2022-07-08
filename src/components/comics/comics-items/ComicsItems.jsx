import "./ComicsItems.scss";
import useMarvelService from "../../../services/MarvelService";
import { useState } from "react";
import { useEffect } from "react";

const ComicsItems = () => {
  const [offset, setOffset] = useState(0);
  const [comics, setComics] = useState([]);

  const { getComisc } = useMarvelService();

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = (offset = 0) => {
    getComisc(offset).then(onComicsLoaded);
  };

  const onComicsLoaded = (arrayComics) => {
    setComics((comics) => [...comics, ...arrayComics]);
    setOffset((offset) => offset + 8);
  };

  const createComicsItems = comics.map(({ thumbnail, title, price }, key) => {
    return (
      <div key={key} className="comics__item">
        <img src={thumbnail} alt="cover" className="cover" />
        <span className="title">{title}</span>
        <span className="price">{price}</span>
      </div>
    );
  });

  return <div className="comics">{createComicsItems}</div>;
};

export default ComicsItems;
