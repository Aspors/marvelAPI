import "./characters-info.scss";
import Aside from "../aside/aside";
import { useState, useRef, useEffect } from "react";
import useMarvelService from "../../../services/MarvelService.jsx";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../error-message/ErrorMessage";
import ErrorBoundary from "../../error-boundary/ErrorBoundary";

const CharactersInfo = () => {
  const [chars, setChars] = useState([]);
  const [id, setId] = useState(undefined);
  const [offset, setOffset] = useState(0);
  const [charLoading, setCharLoading] = useState(false);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setCharLoading(false) : setCharLoading(true);
    getAllCharacters(offset).then(onCharsLoaded);
  };

  const onCharsLoaded = (formed) => {
    if (formed.length < 9) {
      setCharEnded(true);
    }

    setChars((chars) => [...chars, ...formed]);
    setCharLoading(false);
    setOffset((offset) => offset + 9);
  };

  function handleClick(e) {
    setId(e.currentTarget.getAttribute("char-id"));
  }

  const charRefs = useRef([]);

  const onFocusItem = (id) => {
    charRefs.current.forEach((item) =>
      item.classList.remove("character_active")
    );
    charRefs.current[id].classList.add("character_active");
    charRefs.current[id].focus();
  };

  const renderChars = chars.map(({ thumbnail, name, id }, key) => {
    return (
      <div
        ref={(el) => (charRefs.current[key] = el)}
        onClick={(e) => {
          onFocusItem(key);
          handleClick(e);
        }}
        onKeyPress={(e) => {
          if (e.key === " " || e.key === "Enter") {
            handleClick(e);
            onFocusItem(key);
          }
        }}
        key={id}
        tabIndex="0"
        char-id={id}
        className="character">
        <img src={thumbnail} alt="character-thumbnail" />
        <div className="name-wrapper">
          <span className="name">{name}</span>
        </div>
      </div>
    );
  });

  const spinner = loading && !charLoading ? <Spinner /> : null;
  const errorMsg = error ? <ErrorMessage /> : null;

  return (
    <div className="characters-info">
      <div className="all-characters">
        <div className="characters-grid">
          {spinner}
          {errorMsg}
          {renderChars}
        </div>
        <button
          className="button button_load"
          disabled={charLoading}
          style={{ display: charEnded ? "none" : "block" }}
          onClick={() => onRequest(offset)}>
          load more
        </button>
      </div>
      <ErrorBoundary>
        <Aside id={id} />
      </ErrorBoundary>
    </div>
  );
};

export default CharactersInfo;
