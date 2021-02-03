import { useHistory, useParams } from 'react-router-dom';

interface Id {
  id: string;
}

const SingleRecipe = (): JSX.Element => {
  const { id } = useParams();
  const history = useHistory();
  //   const [loading, setLoading] = React.useState(false);
  //   const [recipe, setRecipe] = React.useState(null);

  const handleBack = () => {
    history.goBack();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!recipe) {
    return <h2 className="section-title">no cocktail to display</h2>;
  }

  return <h3>Requested recipe: {id}</h3>;
};

export default SingleRecipe;
