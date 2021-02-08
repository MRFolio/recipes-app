import { motion } from 'framer-motion';
import { MouseEvent, useState } from 'react';
import { GiHamburgerMenu, GiMeal } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';
import Search from './Search';

const Navbar = (): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    setShowMenu(!showMenu);
  };

  return (
    <header className={styles.header}>
      {/* <GrClose/> */}
      {/* {showMenu && <p>Tere</p>} */}
      <Link to="/" style={{ textDecoration: 'inherit' }}>
        <h1 className={styles.heading} title="Go to homepage">
          <GiMeal className={styles.mealIcon} />
          <span>Recipes</span> App
        </h1>
      </Link>
      <Search />
      <motion.button
        onClick={handleClick}
        className={styles.hamburger}
        aria-label="Open hamburger menu"
        title="Open hamburger menu"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
      >
        <GiHamburgerMenu className={styles.burgerIcon} />
      </motion.button>
    </header>
  );
};

export default Navbar;
