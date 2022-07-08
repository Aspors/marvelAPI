import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=ef90cd35acc016275752088bbf8e2496";
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

  const getCharacterById = async (id, descrLimit = true) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformData(res.data.results[0], descrLimit);
  };

  const _transformData = (char, descrLimit) => {
    function descrValidation() {
      if (descrLimit === true) {
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
        return char.description;
      }
    }
    return {
      name: char.name,
      description: descrValidation(),
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics: char.comics.items,
    };
  };

  return { loading, error, getAllCharacters, getCharacterById, clearError };
};

export default useMarvelService;
