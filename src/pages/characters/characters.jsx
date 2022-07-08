import "./characters.scss";
import RandomCharacter from "../../components/characters/random-character/random-character";
import CharactersInfo from "../../components/characters/characters-info/characters-info";

export default function Characters() {
  return (
    <section className="characters">
      <div className="container">
        <RandomCharacter />
        <CharactersInfo />
      </div>
    </section>
  );
}
