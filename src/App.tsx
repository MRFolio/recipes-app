import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { About, Error, Home, SingleRecipe } from './views';

const urlCategories: string =
  'https://www.themealdb.com/api/json/v1/1/categories.php';

const App = () => {
  useEffect(() => {
    const loadCategories = async () => {
      const response = await fetch(urlCategories);
      const data = await response.json();
      console.log(data);
      return data;
    };
    loadCategories();
  }, []);

  return (
    <Router>
      {/* <CssBaseline /> */}
      {/* <Navbar /> */}
      {/* {alert.show && <Alert />} */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/recipes/:id" component={SingleRecipe} />
        <Route path="*" component={Error} />
      </Switch>
    </Router>
  );
};

export default App;
