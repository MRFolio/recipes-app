import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';
import FavoritesList from '../components/FavoritesList';
import { pageTransition, pageVariants } from '../utils';

const Favorites = (): JSX.Element => {
  return (
    <motion.main
      className="main"
      initial="initial"
      animate="in"
      variants={pageVariants}
      transition={pageTransition}
    >
      <FavoritesList />
      <BackButton />
    </motion.main>
  );
};

export default Favorites;
