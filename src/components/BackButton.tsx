import { motion } from 'framer-motion';
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
    <motion.button
      onClick={handleBack}
      className={styles.btnPrimary}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
    >
      <IoChevronBackCircleSharp className={styles.icon} />
      Go Back
    </motion.button>
  );
};

export default BackButton;
