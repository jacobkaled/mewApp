import { Button, CircularProgress, Grid, Link } from "@mui/material";
import useGetCats from "./actions";
import { Link as RouterLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StarIcon from "@mui/icons-material/Star";
import { useRef } from "react";
import { CatsResp } from "../../types";

const Cats = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { data, isLoading, isFetching, fetchNextPage } = useGetCats({}, () => {
    const layout = document.getElementById("main-layout");

    if (layout) {
      const lastElement = layout.lastElementChild;
      if (lastElement) {
        lastElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
  const combinedData = data ? (data.pages.flat() as CatsResp) : [];

  return (
    <>
      {isLoading && (
        <Grid>
          <CircularProgress />
        </Grid>
      )}
      {data && (
        <Grid
          container
          display="flex"
          flexWrap="wrap"
          justifyContent="flex-start"
          ref={ref}
          overflow="scroll"
          width="100%"
          height="auto"
        >
          {data &&
            combinedData.map((cat) => (
              <Grid
                container
                display="flex"
                position="relative"
                flexDirection="row"
                justifyContent="flex-end"
                alignContent="flex-start"
                width="auto"
                height="auto"
                gap="20px"
                key={`Cat-${cat.id}-photo`}
              >
                <Grid
                  position="absolute"
                  top={0}
                  left={0}
                  padding="10px"
                  gap="5px"
                >
                  {cat.breeds && cat.breeds.length > 0 && <AccountCircleIcon />}
                  {cat.favourite && <StarIcon />}
                </Grid>

                <Link
                  component={RouterLink}
                  to={`../cats/${cat.id}`}
                  sx={{ width: "400px", height: "250px", overflow: "hidden" }}
                >
                  <img src={cat.url} alt={cat.id} />
                </Link>
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
