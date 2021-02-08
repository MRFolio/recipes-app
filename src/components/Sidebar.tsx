import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

interface SidebarProps {}

const items = ['tere', 'headaega', 'tere', 'headaega'];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const listItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const Sidebar = ({}: SidebarProps): JSX.Element => {
  return (
    <div className="sidebarWrapper">
      <aside>
        <button className="close-btn" /* onClick={closeSidebar} */>
          <FaTimes />
        </button>
        <motion.ul variants={container} initial="hidden" animate="show">
          {items.map((item, i) => (
            <motion.li key={i} variants={listItem}>
              {item}
            </motion.li>
          ))}
        </motion.ul>
        <div className="links">
          <ul>
            <li></li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
