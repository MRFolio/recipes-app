import { motion } from 'framer-motion';
import { memo, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { setSelectedCategory } from '../store/categoriesSlice';
import { useAppDispatch } from '../store/store';
import { ICategory } from '../store/types';
import {
  containerVariant,
  element1Variant,
  element2Variant,
  transitionItems,
} from '../utils';
import styles from './Category.module.scss';

const Category = memo(
  ({ category, img }: ICategory): JSX.Element => {
    const history = useHistory();
    const dispatch = useAppDispatch();

    const handleClick = (e: MouseEvent<HTMLElement>): void => {
      dispatch(setSelectedCategory(category));
      history.push(`/category/${category}`);
    };

    const articleLabel: string = `Click to see meals of ${category.toUpperCase()} category`;

    return (
      <motion.article
        onClick={handleClick}
        className={styles.container}
        variants={containerVariant}
        initial="hidden"
        animate="show"
        transition={transitionItems}
        title={articleLabel}
        aria-label={articleLabel}
      >
        <motion.div
          className={styles.imgContainer}
          variants={element1Variant}
          transition={transitionItems}
        >
          <img src={img} alt={`${category} on plate`} />
        </motion.div>
        <motion.h4
          className={styles.heading}
          variants={element2Variant}
          transition={transitionItems}
        >
          {category}
        </motion.h4>
      </motion.article>
    );
  }
);

export default Category;
