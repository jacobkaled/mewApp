import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cats from "./pages/cats/index.tsx";
import Favorites from "./pages/favorites/index.tsx";
import Cat from "./pages/cats/[catId]/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/cats" element={<Cats />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cats/:catId" element={<Cat />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
