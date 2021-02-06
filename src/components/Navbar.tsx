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
        <h1 className={styles.heading}>
          <GiMeal className={styles.mealIcon} />
          <span>Recipes</span> App
        </h1>
      </Link>
      <Search />
      <button onClick={handleClick} className={styles.hamburger}>
        <GiHamburgerMenu className={styles.burgerIcon} />
      </button>
    </header>
  );
};

export default Navbar;
