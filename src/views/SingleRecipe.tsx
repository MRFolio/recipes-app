import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Recipe from '../components/Recipe';
import { loadRecipeById, selectSelectedRecipe } from '../store/recipesSlice';
import { useAppDispatch } from '../store/store';
import { pageTransition, pageVariants } from '../utils/animationsUtils';

interface Id {
  id: string;
}

const SingleRecipe = (): JSX.Element => {
  const { id } = useParams<Id>();
  const dispatch = useAppDispatch();
  const selectedRecipe = useSelector(selectSelectedRecipe);

  useEffect(() => {
    dispatch(loadRecipeById(id));
  }, [id, dispatch]);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (!recipe) {
  //   return <h2 className="section-title">no recipe to display</h2>;
  // }

  return (
    <motion.main
      className="main"
      initial="initial"
      animate="in"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Recipe />
      <h3>Requested recipe: {id}</h3>
    </motion.main>
  );
};

export default SingleRecipe;
