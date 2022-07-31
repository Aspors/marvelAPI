import "./characters.scss";
import RandomCharacter from "../../components/characters/random-character/random-character";
import CharactersInfo from "../../components/characters/characters-info/characters-info";
import { Helmet } from "react-helmet";

export default function Characters() {
  return (
    <section className="characters">
      <Helmet>
        <meta name="description" content="Marvel Characters"></meta>
        <title>Marvel Information Portal</title>
      </Helmet>
      <div className="container">
        <RandomCharacter />
        <CharactersInfo />
      </div>
    </section>
  );
}
