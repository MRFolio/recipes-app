import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FavoriteListItem, Spinner } from '../components';
import { selectHasError, selectLoading } from '../store/categoriesSlice';
import { selectFavoritedRecipes } from '../store/recipesSlice';
import { IRecipe } from '../store/types';
import styles from './FavoritesList.module.scss';

const FavoritesList = (): JSX.Element => {
  const favoritedRecipes = useSelector(selectFavoritedRecipes);
  const loading = useSelector(selectLoading);
  const hasError = useSelector(selectHasError);
  const [filteredFavoritedRecipes, setFilteredFavoritedRecipes] = useState<
    IRecipe[]
  >([...favoritedRecipes]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const uniqueCategories: (string | undefined)[] = Array.from(
    new Set(favoritedRecipes.map((recipe) => recipe.category))
  );

  const categoriesSorted = [
    'All',
    ...uniqueCategories.sort((a, b) => a!.localeCompare(b!)),
  ];

  const handleFilterClick = (clickedCategory: string): void => {
    clickedCategory === 'All'
      ? setFilteredFavoritedRecipes(favoritedRecipes)
      : setFilteredFavoritedRecipes(
          favoritedRecipes.filter(
            (recipe) => recipe.category === clickedCategory
          )
        );
    setSelectedCategory(clickedCategory);
  };

  const renderFavoritedRecipes = () => {
    if (loading) return <Spinner />;

    if (hasError) {
      return <p>Cannot display favorites...</p>;
    }

    if (!favoritedRecipes) {
      return <p>No favorites to display...</p>;
    }

    return (
      <>
        {filteredFavoritedRecipes?.map((recipe: IRecipe, index: number) => (
          <FavoriteListItem key={recipe.idMeal} {...recipe} index={index} />
        ))}
      </>
    );
  };

  return (
    <section className={styles.container}>
      <h3 className={styles.heading}>
        Your favourite <span>recipes</span>:{' '}
      </h3>
      <div className={styles.btnContainer}>
        Filter by category:
        {categoriesSorted.map((category) => (
          <button
            onClick={() => handleFilterClick(category!)}
            className={`${styles.categoryBtn} ${
              selectedCategory === category && styles.selected
            }`}
            key={category}
            title={`Select only ${category} category`}
            aria-label={`Click to select only ${category} category`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className={styles.mealContainer}>{renderFavoritedRecipes()}</div>
    </section>
  );
};

export default FavoritesList;
