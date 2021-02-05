import { useCallback, useEffect, useState } from 'react';
import { ICategory } from '../store/types';
import styles from './Categories.module.scss';
import Category from './Category';

const urlCategories: string =
  'https://www.themealdb.com/api/json/v1/1/categories.php';

interface FetchedCategories {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
}

const Categories = (): JSX.Element => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  // const categories = useSelector(
  //   (state: RootState) => state.categories.categories
  // );

  const fetchCategories = useCallback(async () => {
    const response = await fetch(urlCategories);
    const { categories } = await response.json();
    const categoriesFormated = categories.map(
      ({
        idCategory: id,
        strCategory: category,
        strCategoryThumb: img,
      }: FetchedCategories) => ({ id, category, img })
    );
    setCategories(categoriesFormated);
    return categoriesFormated;
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  //   const dispatch = useDispatch<AppDispatch>();
  //   const categories = useSelector((state) => state.categories);
  // console.log(categories);

  return (
    <>
      <h3 className={styles.heading}>
        Choose your favourite <span>category!</span>
      </h3>
      <section className={styles.container}>
        {categories.map((category) => (
          <Category key={category.id} {...category} />
        ))}
      </section>
    </>
  );
};

export default Categories;
