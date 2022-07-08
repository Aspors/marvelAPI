import "./App.scss";
import Header from "../header/header";
import Characters from "../../pages/characters/characters";
import Comics from "../../pages/comics/comics";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Characters />} />
          <Route path="comics" element={<Comics />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
