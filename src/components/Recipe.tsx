import { useSelector } from 'react-redux';
import { selectSelectedRecipe } from '../store/recipesSlice';
import styles from './Recipe.module.scss';

const Recipe = (): JSX.Element => {
  const recipe = useSelector(selectSelectedRecipe);

  // console.log(recipe);
  return (
    <article className={styles.container}>
      {}
      {/* <iframe
        width="420"
        height="315"
        src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1"
      ></iframe>
      <iframe
        width="420"
        height="315"
        src="https://www.youtube.com/embed/tgbNymZ7vqY"
      ></iframe> */}
    </article>
  );
};

export default Recipe;
