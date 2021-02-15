import { motion } from 'framer-motion';
import { BackButton, FavoritesList } from '../components';
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
