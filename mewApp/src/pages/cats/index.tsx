import useGetCats from "./actions";

const Cats = () => {
  const { data, isLoading } = useGetCats();

  return (
    <>
      {isLoading ? (
        <div>...loading </div>
      ) : (
        <div>{data && data.map((cat) => <div>{cat.id}</div>)}</div>
      )}
    </>
  );
};

export default Cats;
