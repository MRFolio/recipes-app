import { motion } from 'framer-motion';
import { useState } from 'react';
import Categories from '../components/Categories';
import { pageTransition, pageVariants } from '../utils/animationsUtils';

const Home = (): JSX.Element => {
  const [showCategories, setShowCategories] = useState<boolean>(false);

  return (
    <motion.main
      className="main"
      initial="initial"
      animate="in"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* <ButtonChoiceContainer
        showCategories={showCategories}
        setShowCategories={setShowCategories}
      /> */}
      {/* showCategories &&  */}
      <Categories />
    </motion.main>
  );
};

export default Home;
