import { useHistory } from 'react-router-dom';

interface Id {
  id: string;
}

const SingleRecipe = (): JSX.Element => {
  // const { id } = useParams();
  const history = useHistory();
  //   const [loading, setLoading] = React.useState(false);
  //   const [recipe, setRecipe] = React.useState(null);

  // const { recipes, loading, error } = useSelector((state) => state.recipes);
  // const dispatch = useDispatch();

  // const fetchOneUser = async (recipeId: string) => {
  //   try {
  //     const resultAction = await dispatch(fetchUserById(recipeId));
  //     const recipe = resultAction.payload;
  //     // showToast('success', `Fetched ${user.name}`);
  //   } catch (err) {
  //     console.log(error.message);
  //   }
  // };

  const handleBack = () => {
    history.goBack();
  };

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (!recipe) {
  //   return <h2 className="section-title">no recipe to display</h2>;
  // }

  return <h3>Requested recipe: {/* {id} */}</h3>;
};

export default SingleRecipe;
