import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCategories, selectCategories } from '../store/categoriesSlice';
import { useAppDispatch } from '../store/store';
import styles from './Categories.module.scss';
import Category from './Category';
import Spinner from './Spinner';

const urlCategories: string =
  'https://www.themealdb.com/api/json/v1/1/categories.php';

interface FetchedCategories {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
}

const Categories = (): JSX.Element => {
  // const [categories, setCategories] = useState<ICategory[]>([]);
  const dispatch = useAppDispatch();
  const { isLoading, hasError, categories } = useSelector(selectCategories);

  // const fetchCategories = useCallback(async () => {
  //   const response = await fetch(urlCategories);
  //   const { categories } = await response.json();
  //   const categoriesFormated = categories.map(
  //     ({
  //       idCategory: id,
  //       strCategory: category,
  //       strCategoryThumb: img,
  //     }: FetchedCategories) => ({ id, category, img })
  //   );
  //   setCategories(categoriesFormated);
  //   return categoriesFormated;
  // }, []);

  useEffect(() => {
    // fetchCategories();
    dispatch(getCategories());
  }, [/* fetchCategories,  */ dispatch]);

  const renderCategories = () => {
    if (isLoading) return <Spinner />;
    if (hasError) return <p>Cannot display categories...</p>;

    return (
      <>
        {categories?.map((category) => (
          <Category key={category.id} {...category} />
        ))}
      </>
    );
  };

  return (
    <>
      <h3 className={styles.heading}>
        Choose your favourite <span>category!</span>
      </h3>
      <section className={styles.container}>{renderCategories()}</section>
    </>
  );
};

export default Categories;
