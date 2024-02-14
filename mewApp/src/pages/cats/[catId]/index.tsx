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
import { Suspense, useState } from "react";
import BasicModal from "../../../components/basicModal";
import useGetCats, { Breed, CatsResp } from "../actions";
import { Waypoint } from "react-waypoint";
import ImageLoader from "../../../components/imageLoader";
import { useImage } from "react-image";

const Cat = () => {
  const { catId } = useParams();
  const { data, isLoading, isSuccess } = useGetCat(catId!);
  const { mutate, isLoading: isMutating } = useMakeCatFav(catId!);
  const [selectedBreed, setSelectedBreed] = useState("");

  console.log("rrerender =====>");
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
      bgcolor="red"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="15px"
    >
      {isLoading && <Grid>...loading </Grid>}

      {isSuccess && data && (
        <>
          {!data.breeds && <Grid> NO Breeds available for this cat !!.. </Grid>}

          {/* <img
            src={data.url}
            width="100%"
            alt="sss"
            loading="lazy"
            key={data.url}
          /> */}
          {/* <ImageLoader src={data.url} /> */}
          <Suspense fallback={<>....loading</>}>
            <MyImageComponent url={data.url} />
          </Suspense>

          <IconButton onClick={() => mutate()} disabled={isMutating}>
            <Typography>make favorite</Typography>
            <GradeIcon />
          </IconButton>
          {data.breeds && data.breeds.length > 0 && (
            <BreedsList
              breedsList={data.breeds}
              onSelectBreed={handleSelectBreed}
            />
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
                  // width={cat.height}
                  // height={cat.height}
                  width="100px"
                  // height="100px"
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

function MyImageComponent({ url }: { url: string }) {
  const { src } = useImage({
    srcList: url,
  });

  return <img src={src} />;
}

export default Cat;
