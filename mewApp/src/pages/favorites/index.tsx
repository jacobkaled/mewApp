import { Button, Grid, Typography } from "@mui/material";
import { useGetFavs, useRemoveFromFavs } from "./actions";
import { useState } from "react";
import RemoveModal from "./components/RemoveModal";

const Favorites = () => {
  const { data, isLoading, isSuccess } = useGetFavs();
  const [selectedFavCat, setSelectedFavCat] = useState<number | null>(null);
  const { mutate, isLoading: isRemoving } = useRemoveFromFavs(() =>
    setSelectedFavCat(null)
  );
  return (
    <Grid>
      {isLoading && <Grid> ... isloading</Grid>}
      {isSuccess && data && (
        <Grid>
          {data.length === 0 ? (
            <Grid>
              <Typography>No Favorite cats in da house</Typography>
            </Grid>
          ) : (
            <Grid>
              {data.map((fav) => (
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
      )}
      {selectedFavCat && (
        <RemoveModal
          title="do you want to remove this cat from favorite list?"
          isLoading={isRemoving}
          isDeleteModalOpen={!!selectedFavCat}
          onCloseModal={() => setSelectedFavCat(null)}
          onDeleteAttribute={() => mutate(selectedFavCat.toString())}
        />
      )}
    </Grid>
  );
};

export default Favorites;
