import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getCategories } from './store/categoriesSlice';
import { RootState, useAppDispatch } from './store/store';
import { About, Error, Home, SingleCategory, SingleRecipe } from './views';

const urlCategories: string =
  'https://www.themealdb.com/api/json/v1/1/categories.php';

interface FetchedCategories {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
}

const App = () => {
  const [cate, setCate] = useState([]);
  const dispatch = useAppDispatch();
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

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
    setCate(categoriesFormated);
    return categoriesFormated;
  }, []);

  useEffect(() => {
    dispatch(getCategories());
    fetchCategories();
  }, [dispatch, fetchCategories]);
  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   const loadCategories = async () => {
  //     const response = await fetch(urlCategories);
  //     const data = await response.json();
  //     console.log(data);
  //     return data;
  //   };
  //   loadCategories();
  //   dispatch(getCategories());
  // }, [dispatch]);

  return (
    <Router>
      {/* <CssBaseline /> */}
      {/* <Navbar /> */}
      {/* {alert.show && <Alert />} */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/recipes/:id" component={SingleRecipe} />
        <Route exact path="/category/:category" component={SingleCategory} />
        <Route path="*" component={Error} />
      </Switch>
    </Router>
  );
};

export default App;
