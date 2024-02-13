import { Button, Grid } from "@mui/material";
import { useGetFavs } from "./actions";
import { useState } from "react";
import RemoveModal from "./components/RemoveModal";

const Favorites = () => {
  const { data, isLoading } = useGetFavs();
  const [selectedFavCat, setSelectedFavCat] = useState<number | null>(null);
  return (
    <Grid>
      {isLoading && <Grid> ... isloading</Grid>}
      {data && (
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

      <RemoveModal
        title="do you want to remove this cat from favorite list?"
        isLoading={false}
        isDeleteModalOpen={!!selectedFavCat}
        onCloseModal={() => setSelectedFavCat(null)}
        onDeleteAttribute={() => null}
      />
    </Grid>
  );
};

export default Favorites;
