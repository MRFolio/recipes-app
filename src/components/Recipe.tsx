import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import {
  selectHasError,
  selectIsLoading,
  selectSelectedRecipe,
} from '../store/recipesSlice';
import styles from './Recipe.module.scss';
import Spinner from './Spinner';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.25,
    },
  },
};

const listItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const Recipe = (): JSX.Element => {
  const recipe = useSelector(selectSelectedRecipe);
  const loading = useSelector(selectIsLoading);
  const hasError = useSelector(selectHasError);

  const {
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

  const replaceYoutubeLink = (link: any): void => {
    if (link) {
      return link.includes('watch?v=')
        ? link.replace('watch?v=', 'embed')
        : link;
    }
  };

  const youtubeLink: any = replaceYoutubeLink(linkYT);

  if (loading) {
    return <Spinner />;
  }

  if (hasError || !recipe) {
    return <h2 className="section-title">no recipe to display</h2>;
  }

  return (
    <article className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={img} alt={meal} title={meal} />
      </div>
      <div className={styles.infoContainer}>
        <h4>{meal}</h4>
        <p>{category}</p>
        <p>{area}</p>
        <motion.button
          aria-label="Open instructions"
          title="Open instructions"
          whileHover={{ scale: 1.04, color: '#902f50' }}
          whileTap={{ scale: 0.95 }}
          className={styles.instructionsBtn}
        >
          Instructions:
        </motion.button>
        {/* <p className={styles.instructions}>{instructions}</p> */}
        <p>
          <a href={linkYT} rel="noreferrer">
            Youtube link
          </a>
        </p>
        <p>
          <a href={linkWeb} rel="noreferrer">
            Web {linkWeb}
          </a>
        </p>
        <p>Ingredients:</p>
        <motion.ul variants={container} initial="hidden" animate="show">
          {ingredients?.map((item, i) => (
            <motion.li key={i} variants={listItem}>
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <iframe
        width="420"
        height="315"
        src={youtubeLink}
        title={`${meal} youtube video`}
      ></iframe>
    </article>
  );
};

export default Recipe;
