import { motion } from 'framer-motion';
import { memo } from 'react';
import { delayVariants } from '../utils/animationsUtils';
import styles from './Ingredient.module.scss';

interface IngredientProps {
  ingredient: string | undefined;
  index: number;
  ingredientMeasures?: (string | undefined)[];
}

const Ingredient = memo(
  ({ ingredient, index, ingredientMeasures }: IngredientProps): JSX.Element => {
    return (
      <motion.li
        key={ingredient}
        custom={index}
        initial="hidden"
        animate="visible"
        variants={delayVariants}
      >
        <figure className={styles.figureContainer}>
          <img
            className={styles.image}
            src={`https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`}
            alt={ingredient}
            title={ingredient}
          />
          <figcaption className={styles.caption}>
            {ingredientMeasures![index]}&nbsp;
            {ingredient}
          </figcaption>
        </figure>
      </motion.li>
    );
  }
);

export default Ingredient;
