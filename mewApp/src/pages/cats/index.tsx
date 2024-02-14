import { CircularProgress, Grid, Link } from "@mui/material";
import useGetCats, { CatsResp } from "./actions";
import { Waypoint } from "react-waypoint";
import { Link as RouterLink } from "react-router-dom";

const Cats = () => {
  const { data, isLoading, isFetching, fetchNextPage } = useGetCats({});
  const combinedData = data ? (data.pages.flat() as CatsResp) : [];

  return (
    <>
      {isLoading && <Grid>...loading </Grid>}
      {data && (
        <Grid container display="flex" justifyContent="center">
          {data &&
            combinedData.map((cat) => (
              <Grid
                container
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="20px"
                key={`Cat-${cat.id}-photo`}
              >
                {/* <Grid>
                  <a href={`../cats/${cat.id}`}>{cat.id}</a>
                </Grid> */}
                <Link component={RouterLink} to={`../cats/${cat.id}`}>
                  <Grid
                    sx={{
                      background: `url(${cat.url})`,
                      backgroundSize: "cover",
                    }}
                    width="300px"
                    height="150px"
                  />
                </Link>
                {/* <img
                  src={cat.url}
                  alt="cat image"
                  // width={cat.height}
                  // height={cat.height}
                  width="100%"
                  // height="100px"
                /> */}
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
