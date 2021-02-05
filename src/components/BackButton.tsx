import { useHistory } from 'react-router-dom';
import styles from './BackButton.module.scss';

const BackButton = (): JSX.Element => {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <button onClick={handleBack} className={styles['btn-primary']}>
      Go Back
    </button>
  );
};

export default BackButton;
