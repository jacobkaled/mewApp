import { Outlet, Route, Routes } from "react-router-dom";
import Cats from "./pages/cats";
import Cat from "./pages/cats/[catId]";
import Favorites from "./pages/favorites";
import NavBar from "./components/navBar/NavBar";
import { Grid } from "@mui/material";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/cats" element={<Cats />} />
        <Route path="/cats/:catId" element={<Cat />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
};

const Layout = () => {
  return (
    <>
      <NavBar />
      <Grid
        id="main-layout"
        width="100vw"
        height="calc(100vh - 80px)"
        overflow="hidden"
        top="80px"
        position="absolute"
      >
        <Outlet />
      </Grid>
    </>
  );
};

export default Router;
