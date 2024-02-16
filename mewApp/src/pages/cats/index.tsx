import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Link,
  TextField,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import BasicModal from "../../components/basicModal";
import { CopyAll } from "@mui/icons-material";
import { CatsList } from "../../components/catsList";
import { useModal } from "../../hooks";

const Cats = () => {
  const [selectedImageUrl, setSelectImageUrl] = useState<string | null>(null);
  const { isOpen, handleCloseModal: closeModal, handleOpenModal } = useModal();

  const handleCloseModal = () => {
    closeModal();
    setSelectImageUrl(null);
  };
  const handleSelectImage = (imageId: string) => {
    handleOpenModal();
    setSelectImageUrl(imageId);
  };

  return (
    <>
      <CatsList
        imageToolBar={(catData) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              backgroundColor: "lightskyblue",
              padding: "5px",
            }}
          >
            <Button onClick={() => handleSelectImage(catData.url)}>
              cat image
            </Button>
            <Link component={RouterLink} to={`../cats/${catData.id}`}>
              Cat Details
            </Link>
          </Box>
        )}
      />

      {selectedImageUrl && (
        <BasicModal open={isOpen} onClose={handleCloseModal}>
          <Grid container justifyContent="center" alignItems="center">
            <img src={selectedImageUrl} width={"800px"} />
            <TextField
              sx={{
                width: "300px",
                position: "absolute",
                top: "30px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
              value={selectedImageUrl}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CopyAll
                      onClick={() =>
                        navigator.clipboard.writeText(selectedImageUrl)
                      }
                    />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
          </Grid>
        </BasicModal>
      )}
    </>
  );
};

export default Cats;
