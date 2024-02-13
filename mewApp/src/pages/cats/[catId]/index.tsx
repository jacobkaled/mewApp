import { useParams } from "react-router";
import useGetCat, { useMakeCatFav } from "./actions";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import { useState } from "react";
import BasicModal from "../../../components/basicModal";
import useGetCats, { CatsResp } from "../actions";
import { Waypoint } from "react-waypoint";

const Cat = () => {
  const { catId } = useParams();
  const { data, isLoading } = useGetCat(catId!);
  const { mutate, isLoading: isMutating } = useMakeCatFav(catId!);
  const [selectedBreed, setSelectedBreed] = useState("");

  const handleSelecetedBreed = (breedId: string) => {
    setSelectedBreed(breedId);
  };

  const closeBreedModal = () => {
    setSelectedBreed("");
  };

  return (
    <>
      {isLoading && <Grid>...loading </Grid>}
      {data && data.breeds && (
        <Grid>
          {data.breeds.length > 0 ? (
            <Grid>
              {/* <a href="./"> */}
              <Button>
                <Typography>
                  {data.breeds.map((breed) => (
                    <Typography onClick={() => setSelectedBreed(breed.id)}>
                      {breed.name}
                    </Typography>
                  ))}
                </Typography>
              </Button>
              {/* </a> */}
            </Grid>
          ) : (
            <Grid> NO Breeds !!.. </Grid>
          )}
        </Grid>
      )}
      {data && (
        <>
          <img src={data.url} />
        </>
      )}
      {data && (
        <IconButton onClick={() => mutate()} disabled={isMutating}>
          <Typography>make favorite</Typography>
          <GradeIcon />
        </IconButton>
      )}

      <BasicModal open={!!selectedBreed} onClose={closeBreedModal}>
        breeeed id ={selectedBreed}
        <BreedList breedid={selectedBreed} />
      </BasicModal>
    </>
  );
};

const BreedList = ({ breedid }: { breedid: string }) => {
  const { data, isLoading, isFetching, fetchNextPage } = useGetCats(breedid);
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
                  // width={cat.height}
                  // height={cat.height}
                  width="100px"
                  height="100px"
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

// const BreedModal = ({
//   selectedBreed,
//   handleSelecetedBreed,
// }: {
//   selectedBreed: boolean;
//   handleSelecetedBreed: () => void;
// }) => {

// };

export default Cat;
