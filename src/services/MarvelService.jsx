import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "no way i'll give you my API key:)";
  const _deafultOffset = 0;

  const getAllCharacters = async (offset = _deafultOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    const formed = res.data.results.map((item) => {
      return _transformData(item);
    });
    return formed;
  };

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);

    return res.data.results.map((item) => {
      return _transformData(item);
    });
  };

  const getComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
    );
    const arrayComics = res.data.results.map((item) => {
      return _transformComics(item);
    });
    return arrayComics;
  };

  const getCharacterById = async (id, descrLimit = true, template) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformData(res.data.results[0], descrLimit, template);
  };

  const getComicsById = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const _transformComics = (comics) => {
    const thumbnailValidation = () => {
      const thumbnailPath =
        comics.thumbnail.path + "." + comics.thumbnail.extension;
      return comics.thumbnail.path.indexOf("image_not_available") === -1
        ? thumbnailPath
        : `${process.env.PUBLIC_URL}/icons/comicsNotfound.jpg`;
    };

    return {
      id: comics.id,
      pages:
        comics.pageCount === 0
          ? "no information about pages"
          : comics.pageCount + " pages",

      thumbnail: thumbnailValidation(),

      title: comics.title,

      description: comics.description
        ? comics.description
        : "there is no description",

      price: comics.prices[0].price
        ? comics.prices[0].price + "$"
        : "NOT AVAILABLE",

      url: comics.urls[0].url,
    };
  };

  const _transformData = (char, descrLimit, template) => {
    function descrValidation() {
      if (descrLimit) {
        if (char.description === "") {
          return (char.description = "No description for this character");
        } else {
          if (char.description.length > 172) {
            return char.description.slice(0, 172) + "...";
          } else {
            return char.description;
          }
        }
      } else {
        return char.description === ""
          ? "No description for this character"
          : char.description;
      }
    }

    function _parseComicUrl(comic) {
      if (template === "comicList") {
        return comic.items.map((item) => {
          return {
            name: item.name,
            id: parseInt(item.resourceURI.slice(-7).replace(/\D+/, "")),
          };
        });
      } else {
        return null;
      }
    }

    return {
      name: char.name,
      description: descrValidation(),
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics: _parseComicUrl(char.comics),
    };
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacterById,
    clearError,
    getComics,
    getComicsById,
    getCharacterByName,
  };
};

export default useMarvelService;
