import { useGetCatsBreeds } from "./actions";
import { Grid, Link } from "@mui/material";

const Breeds = () => {
  const { data, isLoading } = useGetCatsBreeds();

  return (
    <>
      {isLoading && <Grid>...loading </Grid>}
      {data && (
        <Grid>
          <Grid>
            {data.map((breed) => (
              //   <Link to="">{breed.name}</Link>
              <a href="">{breed.name}</a>
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Breeds;
