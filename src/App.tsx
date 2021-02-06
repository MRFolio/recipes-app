import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import { About, Error, Home, SingleCategory, SingleRecipe } from './views';

const App = () => {
  return (
    <Router>
      <Navbar />
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
