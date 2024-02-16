import { useRef } from "react";
import { CatData, CatsResp, QueryParams } from "../../types";
import useGetCats from "../../pages/cats/actions";
import { useScrollDown } from "../../hooks";
import { Button, Card, CircularProgress, Grid } from "@mui/material";

export const CatsList = ({
  queries,
  imageToolBar,
}: {
  queries?: QueryParams;
  imageToolBar: (catData: CatData) => void;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } =
    useGetCats(queries);
  useScrollDown(ref, isFetching);

  console.log("data =>", data);

  return (
    <>
      {isLoading && (
        <Grid>
          <CircularProgress />
        </Grid>
      )}
      {data && data.pages && (
        <Grid
          container
          display="flex"
          flexWrap="wrap"
          justifyContent="flex-start"
          ref={ref}
          gap="20px"
          overflow="scroll"
          width="100%"
          height="100%"
        >
          {data.pages.map((page) =>
            (page as CatsResp).map((cat) => (
              <Card
                sx={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignContent: "flex-start",
                  width: "auto",
                  height: "auto",
                }}
                key={`Cat-${cat.id}-photo`}
              >
                <Grid
                  position="absolute"
                  top={0}
                  left={0}
                  padding="10px"
                  gap="5px"
                ></Grid>
                <Grid container display="flex" flexDirection="column">
                  <Grid
                    sx={{
                      aspectRatio: "1/1",
                      height: "300px",
                      overflow: "hidden",
                      padding: 0,
                    }}
                  >
                    <img src={cat.url} alt={cat.id} />
                  </Grid>
                  <>{imageToolBar(cat)}</>
                </Grid>
              </Card>
            ))
          )}
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
              hasNextPage && (
                <Button onClick={() => fetchNextPage()} disabled={isFetching}>
                  Get more Cats
                </Button>
              )
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};
