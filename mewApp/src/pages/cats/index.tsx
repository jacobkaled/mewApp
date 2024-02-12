import { CircularProgress, Grid } from "@mui/material";
import useGetCats from "./actions";
import { Waypoint } from "react-waypoint";

const Cats = () => {
  const { data, isLoading, isFetching, fetchNextPage } = useGetCats();
  const combinedData = data ? data.pages.flat() : [];

  console.log("combinedData==>", data);

  return (
    <>
      {isLoading ? (
        <Grid>...loading </Grid>
      ) : (
        <Grid container>
          {data &&
            combinedData.map((cat) => (
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
          <Grid
            container
            sx={{
              width: "100%",
              height: "100px",
              marginTop: "100px",
            }}
            display="flex"
            justifyContent="center"
          >
            {isFetching && <CircularProgress />}
            <Waypoint onEnter={() => fetchNextPage()} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Cats;
