import { useSelector } from 'react-redux';
import {
  selectHasError,
  selectIsLoading,
  selectSearchedRecipes,
} from '../store/recipesSlice';
import { ISingleMeal } from '../store/types';
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
      return <p className={styles.errorParagraph}>Cannot display recipes...</p>;
    }

    return (
      <>
        {searchedRecipes?.map((recipe: ISingleMeal, index: number) => (
          <SingleMeal key={recipe.id} {...recipe} index={index} />
        ))}
      </>
    );
  };

  return (
    <section>
      <h3 className={styles.heading}>
        Your search results <span>({searchedRecipes?.length})</span>:
      </h3>
      <div className={styles.recipesContainer}>{renderSearchRecipes()}</div>
    </section>
  );
};

export default SearchRecipes;
