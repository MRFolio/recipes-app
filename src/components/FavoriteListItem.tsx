import { motion } from 'framer-motion';
import { memo, MouseEvent } from 'react';
import { MdDelete } from 'react-icons/md';
import { LinkComponent } from '../components';
import { removeFromFavorites } from '../store/recipesSlice';
import { useAppDispatch } from '../store/store';
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
    const dispatch = useAppDispatch();

    const handeClick = (e: MouseEvent<HTMLButtonElement>): void => {
      dispatch(removeFromFavorites(idMeal));
    };

    return (
      <motion.article
        className={styles.card}
        custom={index}
        initial="hidden"
        animate="visible"
        variants={delayVariants}
      >
        <LinkComponent path={`/recipes/${idMeal}`}>
          <figure className={styles.imageContainer} title={meal}>
            <img src={img} alt={`${meal} preview`} className={styles.image} />
            <figcaption className={styles.caption}>{meal}</figcaption>
          </figure>
        </LinkComponent>
        <div className={styles.divider}></div>
        <motion.button
          className={styles.favoritesBtn}
          aria-label="Remove recipe from favorites"
          title="Remove recipe from favorites"
          whileHover={whileHover}
          whileTap={{ scale: 0.96 }}
          onClick={handeClick}
        >
          Remove
          <MdDelete className={styles.favoriteIcon} />
        </motion.button>
      </motion.article>
    );
  }
);

export default FavoriteListItem;
