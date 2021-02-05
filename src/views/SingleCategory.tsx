import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';

const url: string = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

interface ICategoryRecipes {}

export interface ICategoryRouteParams {
  category: string;
}

const SingleCategory = (): JSX.Element => {
  const { category } = useParams<ICategoryRouteParams>();
  const [categoryRecipes, setCategoryRecipes] = useState<ICategoryRecipes[]>(
    []
  );
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  const fetchCategory = useCallback(async () => {
    try {
      const response = await fetch(url + category);
      const data = await response.json();
      setCategoryRecipes(data);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return (
    <section>
      <BackButton />
      <h4>{category}</h4>
    </section>
  );
};

export default SingleCategory;
