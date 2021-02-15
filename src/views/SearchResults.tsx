import { motion } from 'framer-motion';
import { BackButton, SearchRecipes } from '../components';
import { pageTransition, pageVariants } from '../utils';

const SearchResults = (): JSX.Element => {
  return (
    <motion.main
      className="main"
      initial="initial"
      animate="in"
      variants={pageVariants}
      transition={pageTransition}
    >
      <SearchRecipes />
      <BackButton />
    </motion.main>
  );
};

export default SearchResults;
