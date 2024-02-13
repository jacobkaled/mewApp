import { useParams } from "react-router";
import useGetCat from "./actions";
import { Grid } from "@mui/material";

const Cat = () => {
  const { catId } = useParams();
  const { data, isLoading } = useGetCat(catId!);

  return (
    <>
      {isLoading && <Grid>...loading </Grid>}
      {data && data.breeds && (
        <Grid>
          {data.breeds.length > 0 ? (
            <Grid>
              <a href="">{data.breeds.map((breed) => breed.name)}</a>
            </Grid>
          ) : (
            <Grid> NO Breeds !!.. </Grid>
          )}
        </Grid>
      )}
      {data && <Grid>url : {data.url}</Grid>}
    </>
  );
};

export default Cat;
