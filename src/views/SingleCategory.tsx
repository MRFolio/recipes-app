import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import CategoryMeals from '../components/CategoryMeals';
import { ICategoryRecipe } from '../store/types';

const url: string = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

export interface ICategoryRouteParams {
  category: string;
}

interface FetchedMeals {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const SingleCategory = (): JSX.Element => {
  const { category } = useParams<ICategoryRouteParams>();
  const history = useHistory();
  const [categoryMeals, setCategoryMeals] = useState<ICategoryRecipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleBack = () => {
    history.goBack();
  };

  const fetchCategory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url + category);
      const { meals } = await response.json();
      const formatedMeals: ICategoryRecipe[] = meals.map(
        ({ idMeal: id, strMeal: meal, strMealThumb: img }: FetchedMeals) => ({
          id,
          meal,
          img,
        })
      );
      setCategoryMeals(formatedMeals);
      return meals;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return (
    <main className="main">
      <section className="section">
        <h3 className="heading">
          Choose a recipe from <span>{category}</span> category!
        </h3>
        {/* <h4>{category}</h4> */}
        <CategoryMeals categoryMeals={categoryMeals} />
        <BackButton />
      </section>
    </main>
  );
};

export default SingleCategory;
