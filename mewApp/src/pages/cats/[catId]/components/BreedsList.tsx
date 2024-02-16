import { Button, Card, Typography } from "@mui/material";
import { Breed } from "../../../../types";

type BreedsListProps = {
  breedsList: Array<Breed>;
  onSelectBreed: (breedId: string) => void;
};

const BreedsList = (props: BreedsListProps) => {
  const { breedsList, onSelectBreed } = props;
  return (
    <Card
      sx={{
        paddingY: "10px",
        paddingX: "20px",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {breedsList && breedsList.length > 0 ? (
        <>
          <Typography
            sx={{ paddingBottom: "10px", borderBottom: "1px solid lightBlue" }}
          >
            Available Breeds
          </Typography>

          {breedsList.map((breed, index) => (
            <Button key={`${breed}${index}`}>
              <Typography onClick={() => onSelectBreed(breed.id)}>
                {breed.name}
              </Typography>
            </Button>
          ))}
        </>
      ) : (
        <Typography>NO Breeds available for this cat !!.. </Typography>
      )}
    </Card>
  );
};

export default BreedsList;
