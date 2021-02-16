import { motion } from 'framer-motion';
import { SetStateAction, useCallback, useEffect, useRef } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { MdFavoriteBorder, MdInfoOutline } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { delayVariants } from '../utils';
import styles from './Sidebar.module.scss';

const navItems = [
  {
    id: 0,
    name: 'Home',
    path: '/',
    icon: <AiOutlineHome />,
  },
  {
    id: 1,
    name: 'Favorites',
    path: '/favorites',
    icon: <MdFavoriteBorder />,
  },
  {
    id: 2,
    name: 'About Us',
    path: '/about',
    icon: <MdInfoOutline />,
  },
];

interface SidebarProps {
  showSidebar: boolean;
  setShowSidebar: (value: SetStateAction<boolean>) => void;
}

const Sidebar = ({
  setShowSidebar,
  showSidebar,
}: SidebarProps): JSX.Element => {
  const sidebarContainer = useRef<HTMLElement>(null);
  const { push } = useHistory();

  const handleClick = useCallback(
    (e) =>
      sidebarContainer?.current?.contains(e.target)
        ? null
        : setShowSidebar(false),
    [setShowSidebar]
  );

  const handleEscape = useCallback(
    (e) => (e.key === 'Escape' ? setShowSidebar(false) : null),
    [setShowSidebar]
  );

  const addEventListeners = useCallback(() => {
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClick);
  }, [handleClick, handleEscape]);

  const removeEventListeners = useCallback(() => {
    document.removeEventListener('mousedown', handleClick);
    document.removeEventListener('keydown', handleEscape);
  }, [handleClick, handleEscape]);

  useEffect(() => {
    showSidebar ? addEventListeners() : removeEventListeners();

    return () => removeEventListeners();
  }, [addEventListeners, removeEventListeners, showSidebar]);

  return (
    <aside
      className={`${styles.sidebarContainer} ${showSidebar && styles.show}`}
      ref={sidebarContainer}
    >
      <nav>
        <motion.ul className={styles.list}>
          {navItems.map(({ id, name, path, icon }) => (
            <motion.li
              // variants={listItemSidebar}
              // transition={sidebarTransition}
              onClick={() => {
                push(`${path}`);
                setShowSidebar(false);
              }}
              key={id}
              custom={id}
              initial="hidden"
              animate="visible"
              variants={delayVariants}
              className={styles.listItem}
            >
              {icon} {name}
            </motion.li>
          ))}
        </motion.ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
