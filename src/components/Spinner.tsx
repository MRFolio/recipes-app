import { HalfCircleSpinner } from 'react-epic-spinners';
import styles from './Spinner.module.scss';

const Spinner = (): JSX.Element => (
  <HalfCircleSpinner className={styles.spinner} color="#32CD32" size={50} />
);

export default Spinner;
