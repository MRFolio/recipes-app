import { motion } from 'framer-motion';
import { Categories } from '../components';
import { pageTransition, pageVariants } from '../utils';

const Home = (): JSX.Element => (
  <motion.main
    className="main"
    initial="initial"
    animate="in"
    variants={pageVariants}
    transition={pageTransition}
  >
    <Categories />
  </motion.main>
);

export default Home;
