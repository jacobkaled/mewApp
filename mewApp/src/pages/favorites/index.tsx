import { Button, Card, CircularProgress, Grid } from "@mui/material";
import { useRemoveFromFavs, useGetFavoriteCats } from "./actions";
import { useMemo, useRef, useState } from "react";
import RemoveModal from "./components/RemoveModal";
import { FavoritesRes } from "../../types";
import { HeartBroken } from "@mui/icons-material";
import { useScrollDown } from "../../hooks";

const Favorites = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { data, isLoading, hasNextPage, isFetching, fetchNextPage } =
    useGetFavoriteCats();
  const [selectedFavCat, setSelectedFavCat] = useState<number | null>(null);
  const { mutate, isLoading: isRemoving } = useRemoveFromFavs(() =>
    setSelectedFavCat(null)
  );

  const catsData = useMemo(() => {
    if (!data) {
      return [];
    }
    return (data.pages as Array<FavoritesRes>).reduce(
      (acc, page) => acc.concat(page),
      []
    );
  }, [data]);

  useScrollDown(ref, isFetching);

  return (
    <>
      {isLoading || isFetching ? (
        <Grid>
          <CircularProgress />
        </Grid>
      ) : (
        data && (
          <Grid
            container
            display="flex"
            flexWrap="wrap"
            justifyContent="flex-start"
            gap="20px"
            overflow="scroll"
            width="100%"
            ref={ref}
            height="100%"
          >
            {catsData.length === 0 ? (
              <Grid
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                no Favorites Available
              </Grid>
            ) : (
              <>
                {catsData.map((cat) => (
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
                        <img
                          src={cat.image.url}
                          alt={`favourite image number ${cat.image_id} `}
                        />
                      </Grid>

                      <Button onClick={() => setSelectedFavCat(cat.id)}>
                        remove from favourite <HeartBroken />
                      </Button>
                    </Grid>
                  </Card>
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
                    hasNextPage && (
                      <Button
                        onClick={() => fetchNextPage()}
                        disabled={isFetching}
                      >
                        Get more Cats
                      </Button>
                    )
                  )}
                </Grid>
              </>
            )}
          </Grid>
        )
      )}

      {selectedFavCat && (
        <RemoveModal
          title="do you want to remove this cat from favorite list?"
          isLoading={isRemoving}
          isDeleteModalOpen={!!selectedFavCat}
          onCloseModal={() => setSelectedFavCat(null)}
          onDeleteAttribute={() => mutate({ favId: selectedFavCat.toString() })}
        />
      )}
    </>
  );
};

export default Favorites;
