import "./comics.scss";
import Banner from "../../components/comics/banner/banner";
import ComicsItems from "../../components/comics/comics-items/ComicsItems";
import { Helmet } from "react-helmet";

export default function Comics() {
  return (
    <div className="container">
      <Helmet>
        <meta name="description" content="Marvel-Comics"></meta>
        <title>Comics</title>
      </Helmet>
      <Banner />
      <ComicsItems />
    </div>
  );
}
