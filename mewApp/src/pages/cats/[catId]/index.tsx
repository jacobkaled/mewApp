import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useGetCat from "./actions";

const Cat = () => {
  const { catId } = useParams();
  const { data, isLoading } = useGetCat(catId!);
  console.log("catId", catId);
  return <div>{catId} hey hey </div>;
};

export default Cat;
