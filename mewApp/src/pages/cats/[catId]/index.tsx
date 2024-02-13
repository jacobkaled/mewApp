import { useParams } from "react-router";
import useGetCat, { useMakeCatFav } from "./actions";
import { Grid, IconButton, Typography } from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";

const Cat = () => {
  const { catId } = useParams();
  const { data, isLoading } = useGetCat(catId!);
  const { mutate, isLoading: isMutating } = useMakeCatFav(catId!);

  return (
    <>
      {isLoading && <Grid>...loading </Grid>}
      {data && data.breeds && (
        <Grid>
          {data.breeds.length > 0 ? (
            <Grid>
              <a href="./">
                <Typography>
                  {data.breeds.map((breed) => breed.name)}
                </Typography>
              </a>
            </Grid>
          ) : (
            <Grid> NO Breeds !!.. </Grid>
          )}
        </Grid>
      )}
      {data && (
        <Typography style={{ color: "black" }}>url : {data.url}</Typography>
      )}
      {data && (
        <IconButton onClick={() => mutate()} disabled={isMutating}>
          <Typography>make favorite</Typography>
          <GradeIcon />
        </IconButton>
      )}
    </>
  );
};

export default Cat;
