import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BackButton, CategoryMeals } from '../components';
import { getCategoryMeals } from '../store/categoriesSlice';
import { useAppDispatch } from '../store/store';
import { pageTransition, pageVariants } from '../utils';

export interface ICategoryRouteParams {
  category: string;
}

const SingleCategory = (): JSX.Element => {
  const { category } = useParams<ICategoryRouteParams>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategoryMeals(category));
  }, [dispatch, category]);

  return (
    <motion.main
      className="main"
      initial="initial"
      animate="in"
      variants={pageVariants}
      transition={pageTransition}
    >
      <CategoryMeals />
      <BackButton />
    </motion.main>
  );
};

export default SingleCategory;
