import { useSelector } from 'react-redux';
import {
  selectHasError,
  selectIsLoading,
  selectSearchedRecipes,
} from '../store/recipesSlice';
import { IRecipe } from '../store/types';
import styles from './SearchRecipes.module.scss';
import SingleMeal from './SingleMeal';
import Spinner from './Spinner';

const SearchRecipes = (): JSX.Element => {
  const searchedRecipes = useSelector(selectSearchedRecipes);
  const loading = useSelector(selectIsLoading);
  const hasError = useSelector(selectHasError);

  const renderSearchRecipes = () => {
    if (loading) return <Spinner />;

    if (hasError || !searchedRecipes) {
      return <p>Cannot display recipes...</p>;
    }

    return (
      <>
        {searchedRecipes?.map((meal: IRecipe, index: number) => (
          <SingleMeal key={meal.idMeal} {...meal} index={index} />
        ))}
      </>
    );
  };

  return (
    <>
      <h3 className={styles.heading}>
        Your search results<span>{searchedRecipes.length}</span>:
      </h3>
      <section className={styles.container}>{renderSearchRecipes()}</section>
    </>
  );
};

export default SearchRecipes;
