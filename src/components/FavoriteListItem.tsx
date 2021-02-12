import { motion } from 'framer-motion';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { delayVariants } from '../utils';
import styles from './FavoriteListItem.module.scss';

interface FavoriteListItemProps {
  idMeal: string;
  img?: string;
  meal?: string;
  index: number;
}

const FavoriteListItem = memo(
  ({ idMeal, img, meal, index }: FavoriteListItemProps): JSX.Element => {
    return (
      <Link to={`/recipes/${idMeal}`} style={{ textDecoration: 'inherit' }}>
        <motion.article
          className={styles.card}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={delayVariants}
        >
          <figure className={styles.imageContainer} title={meal}>
            <img src={img} alt={`${meal} preview`} className={styles.image} />
            <figcaption className={styles.caption}>{meal}</figcaption>
          </figure>
        </motion.article>
      </Link>
    );
  }
);

export default FavoriteListItem;
