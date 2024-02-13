import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useGetFavs } from "./actions";
import { useState } from "react";

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

      <DeleteModal
        title="do you want to remove this cat from favorite list?"
        isLoading={false}
        isDeleteModalOpen={!!selectedFavCat}
        onCloseModal={() => setSelectedFavCat(null)}
        onDeleteAttribute={() => null}
      />
    </Grid>
  );
};

type DeleteModalProps = {
  title: string;
  isLoading: boolean;
  isDeleteModalOpen: boolean;
  onCloseModal: () => void;
  onDeleteAttribute: () => void;
};

export function DeleteModal(props: DeleteModalProps) {
  const {
    isLoading,
    title,
    isDeleteModalOpen,
    onCloseModal,
    onDeleteAttribute,
  } = props;
  return (
    <Dialog open={isDeleteModalOpen} maxWidth="sm" onClose={onCloseModal}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button onClick={onCloseModal}>close</Button>
        <Button onClick={onDeleteAttribute} autoFocus disabled={isLoading}>
          {isLoading ? "Loading" : "delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Favorites;
