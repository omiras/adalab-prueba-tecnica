import "./Layout.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import SinglePokemon from "./views/SinglePokemon";

export const Layout = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/**  Cuando accedas al directorio raiz, renderizame el componente home.js */}

          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<SinglePokemon />} />
          <Route path="*" element={<h1>Not found!</h1>} />
        </Routes>
      </BrowserRouter>
      <div className="triangle-left"></div>
      <div className="triangle-right"></div>
      <div className="circle-left"></div>
      <div className="circle-right"></div>
    </div>
  );
};
