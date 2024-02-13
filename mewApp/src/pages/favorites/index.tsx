import { useGetFavs } from "./actions";

const Favorites = () => {
  const { data } = useGetFavs();
  return <div>this is cats FAAAVS</div>;
};

export default Favorites;
