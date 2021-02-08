import { motion } from 'framer-motion';
import { memo, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { setSelectedCategory } from '../store/categoriesSlice';
import { useAppDispatch } from '../store/store';
import { ICategory } from '../store/types';
import styles from './Category.module.scss';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const element1 = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 },
};
const element2 = {
  hidden: { opacity: 0, x: 0, scale: 0.5 },
  show: { opacity: 1, x: 0, scale: 1 },
};

const transitionItems = {
  transition: 'tween',
  ease: 'anticipate',
  duration: 0.7,
};

const Category = memo(
  ({ category, img }: ICategory): JSX.Element => {
    const history = useHistory();
    const dispatch = useAppDispatch();

    const handleClick = (e: MouseEvent<HTMLElement>): void => {
      dispatch(setSelectedCategory(category));
      history.push(`/category/${category}`);
    };

    return (
      <motion.article
        onClick={handleClick}
        className={styles.container}
        variants={container}
        initial="hidden"
        animate="show"
        transition={transitionItems}
      >
        <motion.div
          className={styles.imgContainer}
          variants={element1}
          transition={transitionItems}
        >
          <img src={img} alt={`${category} on plate`} />
        </motion.div>
        <motion.h4
          className={styles.heading}
          variants={element2}
          transition={transitionItems}
        >
          {category}
        </motion.h4>
      </motion.article>
    );
  }
);

export default Category;
