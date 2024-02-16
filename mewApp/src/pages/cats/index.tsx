import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect, useState } from "react";
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
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              backgroundColor: "lightskyblue",
              padding: "5px",
            }}
          >
            <Button onClick={() => handleSelectImage(catData.url)}>
              cat image
            </Button>
            {catData.breeds && catData.breeds.length > 0 && (
              <Typography
                variant="h6"
                sx={{ color: "whitesmoke", fontSize: "12px" }}
              >
                has breed
              </Typography>
            )}
            <Link component={RouterLink} to={`../cats/${catData.id}`}>
              Cat Details
            </Link>
          </Box>
        )}
      />

      {selectedImageUrl && (
        <CatImageModal
          isOpen={isOpen}
          selectedImageUrl={selectedImageUrl}
          onCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

type CatImageModalProps = {
  selectedImageUrl: string;
  isOpen: boolean;
  onCloseModal: () => void;
};

const CatImageModal = (props: CatImageModalProps) => {
  const { selectedImageUrl, isOpen, onCloseModal } = props;
  const [isUrlCopied, setIsUrlCopied] = useState(false);

  useEffect(() => {
    if (isUrlCopied) {
      setTimeout(() => {
        setIsUrlCopied(false);
      }, 2000);
    }
  }, [isUrlCopied]);

  return (
    <BasicModal open={isOpen} onClose={onCloseModal}>
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
                {isUrlCopied ? (
                  <CheckIcon />
                ) : (
                  <IconButton>
                    <CopyAll
                      onClick={() => {
                        navigator.clipboard.writeText(selectedImageUrl);
                        setIsUrlCopied(true);
                      }}
                    />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </Grid>
    </BasicModal>
  );
};

export default Cats;
