import { useGetCatsBreeds } from "./actions";
import { Grid } from "@mui/material";

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
              <a href={`../breeds/${breed.id}`}>{breed.name}</a>
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Breeds;
