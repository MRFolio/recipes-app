import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LinkProps {
  path: string;
  children: ReactNode;
}

const LinkComponent = ({ path, children }: LinkProps): JSX.Element => (
  <Link to={path} style={{ textDecoration: 'inherit', color: 'inherit' }}>
    {children}
  </Link>
);

export default LinkComponent;
