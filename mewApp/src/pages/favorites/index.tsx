import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useRemoveFromFavs, useGetFavsZ } from "./actions";
import { useState } from "react";
import RemoveModal from "./components/RemoveModal";
import { FavoritesRes } from "../../types";

const Favorites = () => {
  const { data, isLoading, isSuccess, isFetching, fetchNextPage } =
    useGetFavsZ();
  const [selectedFavCat, setSelectedFavCat] = useState<number | null>(null);
  const { mutate, isLoading: isRemoving } = useRemoveFromFavs(() =>
    setSelectedFavCat(null)
  );
  const combinedData = data ? (data.pages.flat() as FavoritesRes) : [];

  return (
    <Grid>
      {isLoading && <Grid> ... isloading</Grid>}
      {isSuccess && data && (
        <>
          <Grid>
            {combinedData.length === 0 ? (
              <Grid>
                <Typography>No Favorite cats in da house</Typography>
              </Grid>
            ) : (
              <Grid>
                {combinedData.map((fav) => (
                  <Grid>
                    <img src={fav.image.url} />
                    <Button onClick={() => setSelectedFavCat(fav.id)}>
                      remove from favourite
                    </Button>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
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
        </>
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
    </Grid>
  );
};

export default Favorites;
