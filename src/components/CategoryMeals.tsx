import { memo } from 'react';
import { ICategoryRecipe } from '../store/types';
import styles from './CategoryMeals.module.scss';

interface CategoryMealsProps {
  id: string;
  meal: string;
  img: string;
}

const CategoryMeals = memo(
  ({ categoryMeals }: any | ICategoryRecipe[]): JSX.Element => {
    console.log(categoryMeals);
    //   const renderCategoryMeals = () => {
    //     if (loading) return <Spinner />;
    //     if (hasError) return <p>Cannot display categories...</p>;
    //     return (
    //       <>
    //         {categories?.map((category) => (
    //           <Category key={category.id} {...category} />
    //         ))}
    //       </>
    //     );
    //   };

    return (
      <>
        {/* <h3 className={styles.heading}>
        Choose a recipe from <span>{category}</span> category!
      </h3> */}
        <section className={styles.container}>
          {categoryMeals?.map(({ id, meal, img }: ICategoryRecipe) => (
            <article key={id} className={styles.card}>
              <div className={styles.imageContainer}>
                <img
                  src={img}
                  alt={`${meal} preview`}
                  className={styles.image}
                />
              </div>
              <h4>{meal}</h4>
            </article>
          ))}
          {/* <Link to={`/recipes/${id}`}> */}
          {/* <article className={styles.container}>
            <div className={styles.imgContainer}>
              <img src={img} alt={`${category} on plate`} />
            </div>
            <h4 className={styles.heading}>{category}</h4>
          </article> */}
          {/* </Link> */}
          {/* {renderCategoryMeals()} */}
        </section>
      </>
    );
  }
);

export default CategoryMeals;
