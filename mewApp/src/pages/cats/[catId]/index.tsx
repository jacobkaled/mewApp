import { useParams } from "react-router";
import useGetCat, { useMakeCatFav } from "./actions";
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import { useState } from "react";
import BasicModal from "../../../components/basicModal";
import useGetCats, { Breed, CatsResp } from "../actions";
import { Waypoint } from "react-waypoint";

const Cat = () => {
  const { catId } = useParams();
  const { data, isLoading, isSuccess } = useGetCat(catId!);
  const { mutate, isLoading: isMutating } = useMakeCatFav(catId!);
  const [selectedBreed, setSelectedBreed] = useState("");

  const closeBreedModal = () => {
    setSelectedBreed("");
  };
  const handleSelectBreed = (breedId: string) => {
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
          {data.favourite ? (
            <Typography>your cat has been added to favorites</Typography>
          ) : (
            <Button
              onClick={() => mutate()}
              disabled={isMutating}
              sx={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              <Typography>add this cat to favorite</Typography>
              <GradeIcon />
            </Button>
          )}
          {data.breeds && data.breeds.length > 0 ? (
            <BreedsList
              breedsList={data.breeds}
              onSelectBreed={handleSelectBreed}
            />
          ) : (
            <Card
              variant="elevation"
              sx={{
                marginTop: "10px",
                padding: "20px",
                textAlign: "center",
                border: "1px solid lightGrey",
              }}
            >
              <Typography>NO Breeds available for this cat !!.. </Typography>
            </Card>
          )}
        </>
      )}

      <BasicModal open={!!selectedBreed} onClose={closeBreedModal}>
        <CatsList breedid={selectedBreed} />
      </BasicModal>
    </Grid>
  );
};

const CatsList = ({ breedid }: { breedid: string }) => {
  const { data, isLoading, isFetching, fetchNextPage } = useGetCats({
    breed_ids: breedid,
  });
  const combinedData = data ? (data.pages.flat() as CatsResp) : [];

  //TODO ... reuse the same component from CAT.tsx
  return (
    <>
      {isLoading && <Grid>...loading </Grid>}
      {data && (
        <Grid container>
          {data &&
            combinedData.map((cat) => (
              <Grid container display="flex" flexDirection="column">
                <Grid>{cat.height}</Grid>
                <Grid>{cat.width}</Grid>
                <Grid>
                  <a href={`../cats/${cat.id}`}>{cat.id}</a>
                </Grid>
                <img
                  src={cat.url}
                  alt="cat image"
                  width="100%"
                  style={{ aspectRatio: "1/1" }}
                />
              </Grid>
            ))}
          <Grid
            container
            sx={{
              width: "100%",
              height: "100px",
              marginTop: "100px",
            }}
            display="flex"
            justifyContent="center"
          >
            {isFetching && <CircularProgress />}
            <Waypoint onEnter={() => fetchNextPage()} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

const BreedsList = ({
  breedsList,
  onSelectBreed,
}: {
  breedsList: Array<Breed>;
  onSelectBreed: (breedId: string) => void;
}) => {
  return (
    <Grid>
      {/* <a href="./"> */}
      <Typography> Available Breeds </Typography>
      <Button>
        <Typography>
          {breedsList.map((breed) => (
            <Typography onClick={() => onSelectBreed(breed.id)}>
              {breed.name}
            </Typography>
          ))}
        </Typography>
      </Button>
      {/* </a> */}
    </Grid>
  );
};

export default Cat;
