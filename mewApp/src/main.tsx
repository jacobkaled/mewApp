import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Cats from "./pages/cats/index.tsx";
import Favorites from "./pages/favorites/index.tsx";
import Cat from "./pages/cats/[catId]/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Breeds from "./pages/breeds/index.tsx";
import Breed from "./pages/breeds/[breedId]/index.tsx";
import NavBar from "./components/NavBar.tsx";
import { Grid } from "@mui/material";

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <Grid width="100%" height="100vh">
      <NavBar />
      <Outlet />
    </Grid>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/cats" element={<Cats />} />
            <Route path="/breeds" element={<Breeds />} />
            <Route path="/breeds/:breedId" element={<Breed />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cats/:catId" element={<Cat />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
