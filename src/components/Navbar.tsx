import { motion } from 'framer-motion';
import { MouseEvent, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { GiHamburgerMenu, GiMeal } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { Search, Sidebar } from '../components';
import styles from './Navbar.module.scss';

const Navbar = (): JSX.Element => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const handleToggleSidebar = (e: MouseEvent<HTMLButtonElement>): void => {
    setShowSidebar(!showSidebar);
  };

  return (
    <header className={styles.header}>
      <Link to="/" style={{ textDecoration: 'inherit' }}>
        <h1 className={styles.heading} title="Go to homepage">
          <GiMeal className={styles.mealIcon} />
          <span>Recipes</span> App
        </h1>
      </Link>
      {/* <Link to="/" style={{ textDecoration: 'inherit' }}>
        <h1 className={styles.headingSmallMobile} title="Go to homepage">
          <GiMeal className={styles.mealIcon} />
        </h1>
      </Link> */}
      <Search />
      <motion.button
        onClick={handleToggleSidebar}
        className={styles.hamburger}
        aria-label="Open hamburger menu"
        title="Open hamburger menu"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
      >
        {showSidebar ? (
          <FaTimes className={styles.burgerIcon} />
        ) : (
          <GiHamburgerMenu className={styles.burgerIcon} />
        )}
      </motion.button>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </header>
  );
};

export default Navbar;
