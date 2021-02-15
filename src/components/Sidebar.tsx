import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

interface SidebarProps {}

const navItems = ['Home', 'Favorites', 'About'];

const containerSidebar = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const listItemSidebar = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const Sidebar = ({}: SidebarProps): JSX.Element => {
  // const [showSidebar, setShowSidebar] = useState<boolean>(true);

  // const handleSidebar = (e: MouseEvent<HTMLButtonElement>): void => {
  //   setShowSidebar(!showSidebar);
  // };

  return (
    <aside>
      <button className="close-btn" /* onClick={handleSidebar} */>
        <FaTimes />
      </button>
      <motion.ul variants={containerSidebar} initial="hidden" animate="show">
        {navItems.map((item, i) => (
          <motion.li key={i} variants={listItemSidebar}>
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </aside>
  );
};

export default Sidebar;
