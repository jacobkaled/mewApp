import { Card } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./styles.css";

const NavBar = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        paddingY: "20px",
        display: "flex",
        gap: "10px",
        position: "fixed",
        bgcolor: "white",
        borderBottom: "1px solid lightGrey",
        paddingX: "20px",
      }}
    >
      <NavLink to={"./cats"}>cats</NavLink>
      <NavLink to={"./breeds"}>breeds</NavLink>
      <NavLink to={"./favorites"}>favorites</NavLink>
    </Card>
  );
};

export default NavBar;
