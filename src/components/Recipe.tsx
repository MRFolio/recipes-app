import { motion } from 'framer-motion';
import { MouseEvent, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { MdFavorite } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  addToFavorites,
  removeFromFavorites,
  selectHasError,
  selectIsLoading,
  selectSelectedRecipe,
} from '../store/recipesSlice';
import { useAppDispatch } from '../store/store';
import {
  paragraphTransition,
  paragraphVariants,
  replaceYoutubeLink,
} from '../utils';
import Ingredient from './Ingredient';
import styles from './Recipe.module.scss';
import Spinner from './Spinner';

const Recipe = (): JSX.Element => {
  const recipe = useSelector(selectSelectedRecipe);
  const dispatch = useAppDispatch();
  const loading = useSelector(selectIsLoading);
  const hasError = useSelector(selectHasError);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [addedFavorites, setAddedFavorites] = useState<boolean>(false);

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

  const handleInstructionsClick = (e: MouseEvent<HTMLButtonElement>): void => {
    setShowInstructions((prevShowInstructions) => !prevShowInstructions);
  };

  const handleFavoriteClick = (e: MouseEvent<HTMLButtonElement>): void => {
    if (addedFavorites) {
      setAddedFavorites(false);
      dispatch(removeFromFavorites(idMeal!));
    } else {
      setAddedFavorites(true);
      dispatch(addToFavorites(recipe!));
    }
  };

  if (loading) return <Spinner />;

  if (hasError || !recipe) {
    return <h2 className="section-title">No recipe to display</h2>;
  }

  const favoritesText: string = `${
    addedFavorites ? 'Remove from' : 'Add to'
  } favorites`;

  return (
    <article className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={img} alt={meal} title={meal} />
      </div>
      {/* <InfoContainer /> */}
      <div className={styles.infoContainer}>
        <div className={styles.titleContainer}>
          <h2>{meal}</h2>
          <Link
            to={`/category/${category}`}
            style={{ textDecoration: 'inherit' }}
          >
            <span
              className={styles.categoryText}
              title={`Recipe category: ${category}`}
            >
              {category}
            </span>
          </Link>
        </div>
        <p className={styles.areaText} title="Recipe origin area">
          {area}
        </p>
        <div className={styles.divider}></div>
        <h4
          className={styles.ingredientsTitle}
          title={`Recipe has ${ingredients?.length} ingredients`}
        >
          Ingredients <span>({ingredients?.length})</span>:
        </h4>
        <motion.ul className={styles.ingredientContainer}>
          {ingredients?.map((ingredient, index) =>
            ingredient ? (
              <Ingredient
                key={ingredient}
                ingredient={ingredient}
                ingredientMeasures={ingredientMeasures}
                index={index}
              />
            ) : null
          )}
        </motion.ul>
        <div className={styles.divider}></div>
        <motion.button
          aria-label="Open instructions"
          title="Open instructions"
          whileHover={{
            scale: 1.01,
            boxShadow: '0px 2px 5px 3px rgb(148, 148, 148)',
          }}
          whileTap={{ scale: 0.96 }}
          className={styles.instructionsBtn}
          onClick={handleInstructionsClick}
        >
          {showInstructions ? 'Hide' : 'Show'} instructions{' '}
          {showInstructions ? (
            <BsChevronUp className={styles.icon} />
          ) : (
            <BsChevronDown className={styles.icon} />
          )}
        </motion.button>
        {showInstructions && (
          <motion.p
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={paragraphVariants}
            transition={paragraphTransition}
            className={styles.instructionsText}
          >
            {instructions}
          </motion.p>
        )}
        <div className={styles.divider}></div>
        <motion.button
          aria-label={favoritesText}
          title={favoritesText}
          whileHover={{
            scale: 1.01,
            boxShadow: '0px 2px 5px 3px rgb(148, 148, 148)',
          }}
          whileTap={{ scale: 0.96 }}
          className={styles.favoritesBtn}
          onClick={handleFavoriteClick}
        >
          {favoritesText}
          {/*  {addedFavorites ? (
            <MdFavoriteBorder className={styles.icon} />
          ) : */}{' '}
          {/* <MdFavorite
            className={styles[`${addedFavorites ? 'icon favorite' : 'icon'}`]}
          /> */}
          {/* classNames(styles.sideMenu, this.props.menuOpen && styles.active */}
          {/* this.state.buttonPressed ? styles.title : "" */}
          {/* <div className={`${styles.sideMenu} ${this.props.menuOpen ? styles.inactive : styles.active}`> */}
          <MdFavorite
            className={
              addedFavorites ? 'favoriteIcon favorite' : 'favoriteIcon'
            }
          />
        </motion.button>
      </div>
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
        <h4>Web links:</h4>
        <p>
          <a className={styles.linkText} href={linkYT} rel="noreferrer">
            Video
          </a>
          <a className={styles.linkText} href={linkWeb} rel="noreferrer">
            Article
          </a>
        </p>
      </div>
    </article>
  );
};

export default Recipe;
