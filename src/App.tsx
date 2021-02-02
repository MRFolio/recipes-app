import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { About, Error, Home, SingleRecipe } from './views';

const App = () => {
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
