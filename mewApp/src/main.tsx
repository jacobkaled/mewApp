import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cats from "./pages/cats/index.tsx";
import Favorites from "./pages/favorites/index.tsx";
import Cat from "./pages/cats/[catId]/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Breeds from "./pages/breeds/index.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/cats" element={<Cats />} />
          <Route path="/breeds" element={<Breeds />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cats/:catId" element={<Cat />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
