import { motion } from 'framer-motion';
import { memo, MouseEvent, useRef, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { MdFavorite, MdFeaturedPlayList } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  addToFavorites,
  removeFromFavorites,
  selectFavoritedRecipes,
  selectSelectedRecipe,
} from '../store/recipesSlice';
import { useAppDispatch } from '../store/store';
import { IRecipe } from '../store/types';
import {
  favoriteVariants,
  paragraphTransition,
  paragraphVariants,
} from '../utils';
import styles from './InfoContainer.module.scss';
import Ingredient from './Ingredient';

const InfoContainer = memo(
  ({
    idMeal,
    meal,
    category,
    area,
    instructions,
    ingredients,
    ingredientMeasures,
  }: IRecipe): JSX.Element => {
    const dispatch = useAppDispatch();
    const recipe = useSelector(selectSelectedRecipe);
    const favoritedRecipes = useSelector(selectFavoritedRecipes);
    const [showInstructions, setShowInstructions] = useState<boolean>(false);
    const [addedFavorites, setAddedFavorites] = useState<boolean>(
      favoritedRecipes.some((meal) => meal.idMeal === idMeal)
    );
    const container = useRef<HTMLDivElement>(null);
    const { push } = useHistory();

    const favoritesText: string = `${
      addedFavorites ? 'Remove from' : 'Add to'
    } favorites`;

    const handleInstructionsClick = (
      e: MouseEvent<HTMLButtonElement>
    ): void => {
      const widthConditional = window.innerWidth > 1140;
      const hideParagraph = () => {
        setShowInstructions(false);
        if (container.current && widthConditional) {
          container.current.style.gridRowEnd = '3';
        }
      };
      const showParagraph = () => {
        setShowInstructions(true);
        if (container.current && widthConditional) {
          container.current.style.gridRowEnd = '-1';
        }
      };

      showInstructions ? hideParagraph() : showParagraph();
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

    const handleShowAllFavoritesClick = (
      e: MouseEvent<HTMLButtonElement>
    ): void => {
      push('/favorites');
    };

    return (
      <div ref={container} className={styles.infoContainer}>
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
          className={styles.instructionsBtn}
          aria-label="Toggle instructions"
          title="Toggle instructions"
          whileHover={{
            scale: 1.01,
            boxShadow: '0px 2px 5px 3px rgb(148, 148, 148)',
          }}
          whileTap={{ scale: 0.96 }}
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
            className={styles.instructionsText}
            initial="hidden"
            animate="visible"
            variants={paragraphVariants}
            transition={paragraphTransition}
          >
            {instructions}
          </motion.p>
        )}
        <div className={styles.divider}></div>
        <motion.button
          className={`${styles.favoritesBtn} ${addedFavorites && styles.added}`}
          aria-label={favoritesText}
          title={favoritesText}
          whileHover={{
            scale: 1.01,
            boxShadow: '0px 2px 5px 3px rgb(148, 148, 148)',
          }}
          whileTap={{ scale: 0.96 }}
          onClick={handleFavoriteClick}
        >
          {favoritesText}
          <MdFavorite
            className={`${styles.favoriteIcon} ${
              addedFavorites && styles.favorite
            }`}
          />
        </motion.button>
        {favoritedRecipes!.length > 0 && (
          <>
            <div className={styles.divider}></div>
            <motion.button
              className={styles.allFavoritesBtn}
              aria-label="Go to page with all your favorites listed"
              title="Go to page with all your favorites listed"
              whileHover={{
                scale: 1.01,
                boxShadow: '0px 2px 5px 3px rgb(148, 148, 148)',
              }}
              whileTap={{ scale: 0.96 }}
              initial="hidden"
              animate="visible"
              variants={favoriteVariants}
              transition={paragraphTransition}
              onClick={handleShowAllFavoritesClick}
            >
              Show all favorites
              <MdFeaturedPlayList
                className={`${styles.favoriteIcon} ${
                  addedFavorites && styles.favorite
                }`}
              />
            </motion.button>
          </>
        )}
      </div>
    );
  }
);

export default InfoContainer;
