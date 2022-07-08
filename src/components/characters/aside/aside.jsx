import { useState } from "react";
import useMarvelService from "../../../services/MarvelService";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../error-message/ErrorMessage";
import "./aside.scss";
import { useEffect } from "react";

const Aside = (props) => {
  const [char, setChar] = useState({});

  const { loading, error, getCharacterById, clearError } = useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updChar = () => {
    clearError();
    getCharacterById(props.id, false).then(onCharLoaded);
  };

  useEffect(() => {
    if (props.id !== undefined) {
      updChar(props.id);
      console.log("updated");
    }
  }, [props.id]);

  const Dummy = () => {
    return (
      <>
        <p className="alert">Please select a character to see information</p>
        <div className="dummy">
          <div className="circle"></div>
          <div className="line"></div>
          <div className="bold-line"></div>
          <div className="bold-line"></div>
          <div className="bold-line"></div>
        </div>
      </>
    );
  };

  const CharInfo = () => {
    const renderComics = char.comics.map(({ name, resourceURI }, key) => {
      if (key > 10) return null;
      return (
        <a key={key} href={resourceURI} className="comics__item">
          {name}
        </a>
      );
    });

    const comics =
      char.comics.length === 0 ? (
        <p style={{ textAlign: "center", textTransform: "uppercase" }}>
          no comics available
        </p>
      ) : (
        renderComics
      );

    return (
      <>
        <div className="thumbnail__wrapper">
          <img src={char.thumbnail} alt="char-icon" />
          <div className="name__wrapper">
            <span className="name">{char.name}</span>
            <div className="buttons">
              <a href={char.homepage} className="button">
                <div className="btn-inner">homepage</div>
              </a>
              <a href={char.wiki} className="button button_grey">
                <div className="btn-inner">wiki</div>
              </a>
            </div>
          </div>
        </div>
        <p className="bio">{char.description}</p>
        <span className="comics">Comics:</span>
        <div className="item-wrapper">{comics}</div>
      </>
    );
  };

  const spinner = loading ? <Spinner /> : null;
  const errorMsg = error ? <ErrorMessage /> : null;
  const dummy = !(loading || error || char.name) ? <Dummy /> : null;
  const content = !(loading || error || !char.name) ? <CharInfo /> : null;

  return (
    <>
      <aside>
        <div className="character-info_bio">
          {spinner}
          {errorMsg}
          {dummy}
          {content}
        </div>
      </aside>
    </>
  );
};

export default Aside;
