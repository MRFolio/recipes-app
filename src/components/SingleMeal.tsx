import { motion } from 'framer-motion';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { delayVariantsFaster } from '../utils';
import styles from './SingleMeal.module.scss';

interface IMealProps {
  id: string;
  meal: string;
  img: string;
  index: number;
}

const SingleMeal = memo(
  ({ id, meal, img, index }: IMealProps): JSX.Element => (
    <Link to={`/recipes/${id}`} style={{ textDecoration: 'inherit' }}>
      <motion.article
        className={styles.card}
        custom={index}
        initial="hidden"
        animate="visible"
        variants={delayVariantsFaster}
        title={`Click to see details of ${meal}`}
      >
        <figure className={styles.imageContainer}>
          <img src={img} alt={`${meal} preview`} className={styles.image} />
          <figcaption className={styles.caption}>{meal}</figcaption>
        </figure>
      </motion.article>
    </Link>
  )
);

export default SingleMeal;
