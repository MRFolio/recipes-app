interface RecipesProps {}

const Recipes = ({}: RecipesProps): JSX.Element => {
  return (
    <>
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          console.log('tere')
        }
      >
        Add stuff
      </button>
      <h1>Tere</h1>
    </>
  );
};

export default Recipes;
