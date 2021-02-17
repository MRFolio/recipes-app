import { memo } from 'react';
import { useSelector } from 'react-redux';
import { SingleMeal, Spinner } from '../components';
import {
  selectHasError,
  selectLoading,
  selectSelectedCategory,
  selectSelectedCategoryMeals,
} from '../store/categoriesSlice';
import { ISingleMeal } from '../store/types';
import styles from './CategoryMeals.module.scss';

const CategoryMeals = memo(
  (): JSX.Element => {
    const category = useSelector(selectSelectedCategory);
    const categoryMeals = useSelector(selectSelectedCategoryMeals);
    const loading = useSelector(selectLoading);
    const hasError = useSelector(selectHasError);

    const renderCategoryMeals = () => {
      if (loading) return <Spinner />;

      if (hasError || !categoryMeals) {
        return <p>Cannot display categories...</p>;
      }

      return (
        <>
          {categoryMeals?.map((meal: ISingleMeal, index: number) => (
            <SingleMeal key={meal.id} {...meal} index={index} />
          ))}
        </>
      );
    };

    return (
      <section>
        <h3 className={styles.heading}>
          Choose a recipe from <span>{category}</span> category!
        </h3>
        <div className={styles.mealsContainer}>{renderCategoryMeals()}</div>
      </section>
    );
  }
);

export default CategoryMeals;
