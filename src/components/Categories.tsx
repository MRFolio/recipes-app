import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCategories, selectCategories } from '../store/categoriesSlice';
import { useAppDispatch } from '../store/store';
import styles from './Categories.module.scss';
import Category from './Category';
import Spinner from './Spinner';

const Categories = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { isLoading, hasError, categories } = useSelector(selectCategories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const renderCategories = () => {
    if (isLoading) return <Spinner />;
    if (hasError) return <p>Cannot display categories...</p>;

    return (
      <>
        {categories?.map((category) => (
          <Category key={category.id} {...category} />
        ))}
      </>
    );
  };

  const container = {
    hidden: {
      opacity: 0,
      transition: { when: 'beforeChildren' },
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        // delayChildren: 0.25,
      },
    },
  };

  return (
    <>
      <h3 className={styles.heading}>
        Choose your favourite <span>category!</span>
      </h3>
      <motion.section
        // variants={container}
        // initial="hidden"
        // animate="show"
        className={styles.container}
      >
        {renderCategories()}
      </motion.section>
    </>
  );
};

export default Categories;
