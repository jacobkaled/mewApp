import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Grid container width="100%" paddingY="20px" display="flex" gap="10px">
      <Link to={"./cats"}>cats</Link>
      <Link to={"./breeds"}>breeds</Link>
      <Link to={"./favorites"}>favs</Link>
    </Grid>
  );
};

export default NavBar;
