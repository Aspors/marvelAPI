import "./App.scss";
import Header from "../header/header";
import Characters from "../../pages/characters/characters";
import Comics from "../../pages/comics/comics";
import { Routes, Route } from "react-router-dom";
import Notfound from "../../pages/404notfound/404notfound";
import ComicsPage from "../../pages/comics-page/ComicsPage";
import SinglePage from "../../pages/single-page/SinglePage";
import CharPage from "../../pages/char-page/CharPage";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <>
          <Route index element={<Characters />} />
          <Route
            path="/:id"
            element={<SinglePage Component={CharPage} type={"character"} />}
          />
          <Route path="comics" element={<Comics />} />
          <Route
            path="comics/:id"
            element={<SinglePage Component={ComicsPage} type={"comics"} />}
          />

          <Route path="*" element={<Notfound />} />
        </>
      </Routes>
    </>
  );
};

export default App;
