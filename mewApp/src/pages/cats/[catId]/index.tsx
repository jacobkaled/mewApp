import { useParams } from "react-router";
import useGetCat from "./actions";
import { Grid } from "@mui/material";

const Cat = () => {
  const { catId } = useParams();
  const { data, isLoading } = useGetCat(catId!);

  return (
    <>
      {isLoading && <Grid>...loading </Grid>}
      {data && (
        <Grid>
          {data.breeds.length > 0 ? (
            <Grid>{data.breeds.map((breed) => breed.name)}</Grid>
          ) : (
            <Grid> NO Breeds !!.. </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default Cat;
