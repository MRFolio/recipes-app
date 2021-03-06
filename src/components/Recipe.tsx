import { MdOpenInNew } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { InfoContainer, Spinner } from '../components';
import {
  selectHasError,
  selectIsLoading,
  selectSelectedRecipe,
} from '../store/recipesSlice';
import { replaceYoutubeLink } from '../utils';
import styles from './Recipe.module.scss';

const Recipe = (): JSX.Element => {
  const recipe = useSelector(selectSelectedRecipe);
  const loading = useSelector(selectIsLoading);
  const hasError = useSelector(selectHasError);

  const {
    idMeal,
    meal,
    category,
    area,
    instructions,
    img,
    linkYT,
    linkWeb,
    ingredients,
    ingredientMeasures,
  } = recipe || {};

  const youtubeLink: string | undefined = replaceYoutubeLink(linkYT);

  if (loading) return <Spinner />;

  if (hasError || !recipe) {
    return <p className={styles.errorParagraph}>No recipe to display!</p>;
  }

  return (
    <article className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={img} alt={meal} title={meal} />
      </div>
      <InfoContainer
        idMeal={idMeal!}
        meal={meal!}
        category={category}
        area={area}
        instructions={instructions}
        ingredients={ingredients}
        ingredientMeasures={ingredientMeasures}
      />
      {youtubeLink && (
        <div className={styles.videoContainer}>
          <iframe
            src={youtubeLink}
            title={`${meal} youtube video`}
            frameBorder="0"
            allow="encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <div className={styles.linkContainer}>
        <p>
          <a className={styles.linkText} href={linkYT} rel="noreferrer">
            Video <MdOpenInNew />
          </a>
          <a className={styles.linkText} href={linkWeb} rel="noreferrer">
            Article <MdOpenInNew />
          </a>
        </p>
      </div>
    </article>
  );
};

export default Recipe;
