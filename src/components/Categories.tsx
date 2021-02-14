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
    if (hasError)
      return (
        <p className={styles.errorParagraph}>Cannot display categories...</p>
      );

    return (
      <>
        {categories?.map((category) => (
          <Category key={category.id} {...category} />
        ))}
      </>
    );
  };

  return (
    <>
      <h3 className={styles.heading}>
        Choose your favourite <span>category!</span>
      </h3>
      <motion.section className={styles.container}>
        {renderCategories()}
      </motion.section>
    </>
  );
};

export default Categories;
