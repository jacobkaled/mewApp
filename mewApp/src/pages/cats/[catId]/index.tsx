import { useParams } from "react-router";
import useGetCat, { useMakeCatFav } from "./actions";
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import BasicModal from "../../../components/basicModal";
import { useNavigate } from "react-router-dom";
import { CatsList } from "../../../components/catsList";
import BreedsList from "./components/BreedsList";
import { useModal } from "../../../hooks";

const Cat = () => {
  const { catId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isSuccess } = useGetCat(catId!);
  const {
    isOpen,
    handleCloseModal: closeModal,
    handleOpenModal: openModal,
  } = useModal();
  const { mutate, isLoading: isMutating } = useMakeCatFav(catId!, () =>
    navigate("../favorites")
  );
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);

  const handleCloseBreedModal = () => {
    closeModal();
    setSelectedBreed(null);
  };
  const handleSelectBreed = (breedId: string) => {
    openModal();
    setSelectedBreed(breedId);
  };

  return (
    <Grid
      container
      marginX="auto"
      width="800px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="15px"
    >
      {isLoading && (
        <Grid>
          <CircularProgress />
        </Grid>
      )}

      {isSuccess && data && (
        <>
          <img src={data.url} style={{ maxWidth: "100%" }} />
          <Card
            sx={{
              position: "fixed",
              top: "100px",
              left: "20px",
              padding: "10px",
            }}
          >
            <Button
              onClick={() => mutate()}
              disabled={isMutating}
              sx={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              <Typography>add this cat to favorite</Typography>
              <FavoriteIcon />
            </Button>

            <BreedsList
              breedsList={data.breeds}
              onSelectBreed={handleSelectBreed}
            />
          </Card>
        </>
      )}
      {selectedBreed && (
        <BasicModal open={isOpen} onClose={handleCloseBreedModal}>
          <CatsList
            queries={{ breed_ids: selectedBreed }}
            imageToolBar={(catData) => (
              <Button
                onClick={() => {
                  handleCloseBreedModal();
                  navigate(`../cats/${catData.id}`);
                }}
                sx={{
                  width: "100%",
                  backgroundColor: "lightskyblue",
                  padding: "5px",
                }}
              >
                Cat Details
              </Button>
            )}
          />
        </BasicModal>
      )}
    </Grid>
  );
};

export default Cat;
