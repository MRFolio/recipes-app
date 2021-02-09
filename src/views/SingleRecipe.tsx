import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Recipe from '../components/Recipe';
import { loadRecipeById } from '../store/recipesSlice';
import { useAppDispatch } from '../store/store';
import { pageTransition, pageVariants } from '../utils/animationsUtils';

interface Id {
  id: string;
}

const SingleRecipe = (): JSX.Element => {
  const { id } = useParams<Id>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadRecipeById(id));
  }, [id, dispatch]);

  return (
    <motion.main
      className="main"
      initial="initial"
      animate="in"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Recipe />
      <BackButton />
    </motion.main>
  );
};

export default SingleRecipe;
