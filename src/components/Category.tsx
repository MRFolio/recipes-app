import { Link } from 'react-router-dom';
import { ICategory } from '../store/types';
import styles from './Category.module.scss';

const Category = ({ category, img }: ICategory): JSX.Element => {
  return (
    <Link to={`/category/${category}`}>
      <article className={styles.container}>
        <div className={styles.imgContainer}>
          <img src={img} alt={`${category} on plate`} />
        </div>
        <h4 className={styles.heading}>{category}</h4>
      </article>
    </Link>
  );
};

export default Category;
