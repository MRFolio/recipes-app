import { motion } from 'framer-motion';
import { memo, MouseEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { delayVariantsFaster } from '../utils';
import styles from './CategoryMeal.module.scss';

interface ICategoryMealProps {
  id: string;
  meal: string;
  img: string;
  index: number;
}

const CategoryMeal = memo(
  ({ id, meal, img, index }: ICategoryMealProps): JSX.Element => {
    const history = useHistory();

    const handleClick = (e: MouseEvent<HTMLElement>) => {
      history.push(`/recipes/${id}`);
    };

    return (
      <Link to={`/recipes/${id}`} style={{ textDecoration: 'inherit' }}>
        <motion.article
          /* onClick={handleClick} */ className={styles.card}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={delayVariantsFaster}
        >
          <figure className={styles.imageContainer}>
            <img src={img} alt={`${meal} preview`} className={styles.image} />
            <figcaption className={styles.caption}>{meal}</figcaption>
          </figure>
        </motion.article>
      </Link>
    );
  }
);

export default CategoryMeal;
