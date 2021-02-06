import { IoChevronBackCircleSharp } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import styles from './BackButton.module.scss';

const BackButton = (): JSX.Element => {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };
  //back icon
  return (
    <button onClick={handleBack} className={styles['btn-primary']}>
      <IoChevronBackCircleSharp className={styles.icon} />
      Go Back
    </button>
  );
};

export default BackButton;
