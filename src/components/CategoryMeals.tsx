import { memo } from 'react';
import { useSelector } from 'react-redux';
import {
  selectHasError,
  selectLoading,
  selectSelectedCategory,
  selectSelectedCategoryMeals,
} from '../store/categoriesSlice';
import { ISingleMeal } from '../store/types';
import styles from './CategoryMeals.module.scss';
import CategoryMeal from './SingleMeal';
import Spinner from './Spinner';

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
            <CategoryMeal key={meal.id} {...meal} index={index} />
          ))}
        </>
      );
    };

    return (
      <>
        <h3 className={styles.heading}>
          Choose a recipe from <span>{category}</span> category!
        </h3>
        <section className={styles.container}>{renderCategoryMeals()}</section>
      </>
    );
  }
);

// <Link to={`/category/${category}`}>
// <article className={styles.container}>
//   <div className={styles.imgContainer}>
//     <img src={img} alt={`${category} on plate`} />
//   </div>
//   <h4 className={styles.heading}>{category}</h4>
// </article>
// </Link>

export default CategoryMeals;
