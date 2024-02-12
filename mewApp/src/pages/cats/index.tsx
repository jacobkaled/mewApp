import { Grid } from "@mui/material";
import useGetCats from "./actions";

const Cats = () => {
  const { data, isLoading } = useGetCats();

  return (
    <>
      {isLoading ? (
        <Grid>...loading </Grid>
      ) : (
        <Grid container>
          {data &&
            data.map((cat) => (
              <Grid container display="flex" flexDirection="column">
                <Grid>{cat.height}</Grid>
                <Grid>{cat.width}</Grid>
                <Grid>
                  <a href={`../cats/${cat.id}`}>{cat.id}</a>
                </Grid>
                <img
                  src={cat.url}
                  alt="cat image"
                  // width={cat.height}
                  // height={cat.height}
                  width="100px"
                  height="100px"
                />
              </Grid>
            ))}
        </Grid>
      )}
    </>
  );
};

export default Cats;
