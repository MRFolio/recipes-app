import { motion } from 'framer-motion';
import { memo } from 'react';
import { MdFavorite } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { delayVariants, whileHover } from '../utils';
import styles from './FavoriteListItem.module.scss';

interface FavoriteListItemProps {
  idMeal: string;
  img?: string;
  meal?: string;
  index: number;
}

const FavoriteListItem = memo(
  ({ idMeal, img, meal, index }: FavoriteListItemProps): JSX.Element => {
    const handleRemoveFavorite = (idMeal: string): void => {};

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
          <motion.button
            className={styles.favoritesBtn}
            aria-label="Remove recipe from favorites"
            title="Remove recipe from favorites"
            whileHover={whileHover}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleRemoveFavorite('tere')}
          >
            Remove from favorites
            <MdFavorite className={styles.favoriteIcon} />
          </motion.button>
        </motion.article>
      </Link>
    );
  }
);

export default FavoriteListItem;
