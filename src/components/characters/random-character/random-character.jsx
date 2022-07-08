import { useState } from "react";
import ErrorMessage from "../../error-message/ErrorMessage";
import Spinner from "../../spinner/Spinner";
import useMarvelService from "../../../services/MarvelService";

import "./random-character.scss";
import { useEffect } from "react";

const RandomCharacter = () => {
  const [char, setChar] = useState({});

  const { loading, error, getCharacterById, clearError } = useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011428 - 1009146) + 1009146);
    getCharacterById(id).then(onCharLoaded);
  };

  const handleRandomChar = () => {
    updChar();
  };

  useEffect(() => {
    updChar();
  }, []);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? View(char) : null;
  return (
    <div className="rand">
      <div className="rand__char-card">
        {errorMessage}
        {spinner}
        {content}
      </div>
      <div className="rand__char">
        <p>
          Random character for today!
          <br /> Do you want to get to know him better?
        </p>
        <p>Or choose another one</p>
        <button onClick={handleRandomChar} className="button">
          try it
        </button>
      </div>
    </div>
  );
};

const View = (char) => {
  const { thumbnail, name, description, homepage, wiki } = char;
  return (
    <>
      <img src={thumbnail} alt="/icons/image_not_available.jpg" />
      <div className="char_descr">
        <span>{name}</span>
        <p>{description}</p>
        <a href={homepage} className="button">
          <div className="btn-inner"> Homepage</div>
        </a>
        <a href={wiki} className="button button_grey">
          <div className="btn-inner"> Wiki</div>
        </a>
      </div>
    </>
  );
};

export default RandomCharacter;
