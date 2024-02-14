import { Button, CircularProgress, Grid, Link } from "@mui/material";
import useGetCats, { CatsResp } from "./actions";
import { Link as RouterLink } from "react-router-dom";
import { useRef } from "react";

const Cats = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { data, isLoading, isFetching, fetchNextPage } = useGetCats({}, () => {
    const layout = document.getElementById("main-layout");
    //layout && layout.scrollTo(0, layout.scrollHeight);
    layout && layout.scrollIntoView(false);
  });
  const combinedData = data ? (data.pages.flat() as CatsResp) : [];

  return (
    <>
      {isLoading && <Grid>...loading </Grid>}
      {data && (
        <Grid
          container
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          ref={ref}
          overflow="scroll"
          width="auto"
          height="auto"
        >
          {data &&
            combinedData.map((cat) => (
              <Grid
                container
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                width="auto"
                gap="20px"
                key={`Cat-${cat.id}-photo`}
              >
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
              paddingY: "20px",
            }}
            display="flex"
            justifyContent="center"
          >
            {isFetching ? (
              <CircularProgress />
            ) : (
              <Button onClick={() => fetchNextPage()} disabled={isFetching}>
                Get more Cats
              </Button>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Cats;
