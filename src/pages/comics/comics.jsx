import "./comics.scss";
import Banner from "../../components/comics/banner/banner";
import ComicsItems from "../../components/comics/comics-items/ComicsItems";

export default function Comics() {
  return (
    <div className="container">
      <Banner />
      <ComicsItems />
    </div>
  );
}
