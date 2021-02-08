import { MouseEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ICategoryMeal } from '../store/types';
import styles from './CategoryMeal.module.scss';

const CategoryMeal = ({ id, meal, img }: ICategoryMeal): JSX.Element => {
  const history = useHistory();

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    history.push(`/recipes/${id}`);
  };
  //Link

  return (
    <Link to={`/recipes/${id}`} style={{ textDecoration: 'inherit' }}>
      <article /* onClick={handleClick} */ className={styles.card}>
        <figure className={styles.imageContainer}>
          <img src={img} alt={`${meal} preview`} className={styles.image} />
          <figcaption className={styles.caption}>{meal}</figcaption>
        </figure>
      </article>
    </Link>
  );
};

export default CategoryMeal;
