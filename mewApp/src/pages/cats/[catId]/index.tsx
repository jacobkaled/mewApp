import { useParams } from "react-router";

const Cat = () => {
  const { catId } = useParams();
  console.log("catId", catId);
  return <div>{catId} hey hey </div>;
};

export default Cat;
