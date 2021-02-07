import { FaTimes } from 'react-icons/fa';

interface SidebarProps {}

const Sidebar = ({}: SidebarProps): JSX.Element => {
  return (
    <div className="sidebarWrapper">
      <aside>
        <button className="close-btn" /* onClick={closeSidebar} */>
          <FaTimes />
        </button>
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
